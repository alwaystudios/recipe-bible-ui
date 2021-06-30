import {
  Button,
  Checkbox,
  Tab,
  Tabs,
  TextAreaWithConfirmation,
  TextInput,
  TextInputWithConfirmation,
} from '@alwaystudios/as-ui-components'
import { CATEGORIES, Recipe, toSlug } from '@alwaystudios/recipe-bible-sdk'
import { Category, Ingredient, Step } from '@alwaystudios/recipe-bible-sdk/dist/types'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { removeFromArray, removeObjectFromArray, updateArrayUnq } from '../domain/recipeForm'
import { fromRecipeApi, toIngredientsApi, toStepsApi } from '../domain/recipeTransformer'
import { useIngredients } from '../hooks/useIngredients'
import { IngredientForm } from './IngredientForm'
import { Ingredients } from './Ingredients'
import { RecipeImageForm } from './RecipeImageForm'
import { StepForm } from './StepForm'
import { Steps } from './Steps'
import { YouWillNeed } from './YouWillNeed'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  width: fit-content;
`

type Props = {
  recipe: Recipe
  updateRecipe: (updates: DeepPartial<Recipe>) => Promise<void>
  deleteRecipe: (title: string) => Promise<void>
}

export const RecipeForm: React.FC<Props> = ({ recipe, updateRecipe, deleteRecipe }) => {
  const {
    title,
    story,
    imgSrc,
    categories,
    cookingTime,
    servings,
    youWillNeed,
    steps,
    ingredients,
    metadata: { published, focused },
    nutrition: { fat = '', protein = '', carbs = '' },
  } = fromRecipeApi(recipe)
  const history = useHistory()
  const [input, setInput] = useState('')
  const { saveIngredient, getIngredients, ingredients: allIngredients } = useIngredients()
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    getIngredients()
    setDidMount(true)
    return () => setDidMount(false)
  }, [])

  if (!didMount) {
    return null
  }

  const handleUpdateRecipe = (updates: DeepPartial<Recipe>) => updateRecipe(updates)

  const handleYouWillNeedUpdate = () => {
    handleUpdateRecipe({ youWillNeed: updateArrayUnq(input, youWillNeed) })
    setInput('')
  }

  const handleCategories = (checked: boolean, category: Category) => {
    if (checked) {
      handleUpdateRecipe({ categories: updateArrayUnq<Category>(category, categories) })
    } else {
      handleUpdateRecipe({ categories: removeFromArray(category, categories) })
    }
  }

  const handleUpdateIngredients = (ingredients: Ingredient[]) =>
    handleUpdateRecipe({ ingredients: toIngredientsApi(ingredients) })

  const handleUpdateSteps = (steps: Step[]) => handleUpdateRecipe({ steps: toStepsApi(steps) })

  return (
    <FormContainer autoComplete="off">
      <h1>{title}</h1>
      <Link to={`/recipes/${toSlug(title)}`}>view</Link>
      <Button
        text="delete"
        onClick={() => deleteRecipe(toSlug(title)).then(() => history.push('/manage/recipes'))}
      />
      <Button
        text={published ? 'unpublish' : 'publish'}
        onClick={() => handleUpdateRecipe({ metadata: { published: !published } })}
        disabled={focused}
      />
      {published && (
        <Button
          text={focused ? 'unfocus' : 'focus'}
          onClick={() => handleUpdateRecipe({ metadata: { focused: !focused } })}
        />
      )}
      <Tabs>
        <Tab title="Photo">
          <RecipeImageForm
            title={title}
            imgSrc={imgSrc}
            setImgSrc={(imgSrc: string) => handleUpdateRecipe({ imgSrc })}
          />
        </Tab>
        <Tab title="Story">
          <TextAreaWithConfirmation
            rows={8}
            value={story}
            onConfirm={(story: string) => handleUpdateRecipe({ story })}
          />
        </Tab>
        <Tab title="Categories">
          <Categories>
            {CATEGORIES.map((category, index) => (
              <Checkbox
                key={index}
                label={category}
                checked={categories.includes(category)}
                onChange={(checked: boolean) => handleCategories(checked, category)}
              />
            ))}
          </Categories>
        </Tab>
        <Tab title="Nutrition">
          <label htmlFor="fat-input">fat</label>
          <TextInputWithConfirmation
            id="fat-input"
            onConfirm={(fat) => handleUpdateRecipe({ nutrition: { fat } })}
            value={fat}
          />
          <label htmlFor="carbs-input">carbs</label>
          <TextInputWithConfirmation
            id="carbs-input"
            onConfirm={(carbs) => handleUpdateRecipe({ nutrition: { carbs } })}
            value={carbs}
          />
          <label htmlFor="protein-input">protein</label>
          <TextInputWithConfirmation
            id="protein-input"
            onConfirm={(protein) => handleUpdateRecipe({ nutrition: { protein } })}
            value={protein}
          />
        </Tab>
        <Tab title="You will need">
          <TextInput
            role="you-will-need"
            id="you-will-need-input"
            onChange={(event) => setInput(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key.toLocaleLowerCase() === 'enter') {
                handleYouWillNeedUpdate()
              }
            }}
            value={input}
          />
          <Button text="add" onClick={handleYouWillNeedUpdate} disabled={input === ''} />
          <YouWillNeed
            values={youWillNeed}
            onDelete={(value: string) =>
              handleUpdateRecipe({ youWillNeed: removeFromArray(value, youWillNeed) })
            }
          />
        </Tab>
        <Tab title="Steps">
          <StepForm
            nextStepIndex={steps.length + 1}
            recipeTitle={title}
            saveStep={(step: Step) => handleUpdateSteps([...steps, step])}
          />
          <Steps
            steps={steps}
            setSteps={(steps) => handleUpdateSteps(steps)}
            onDelete={(step) => handleUpdateSteps(steps.filter((s) => s.step !== step))}
          />
        </Tab>
        <Tab title="Ingredients">
          <Ingredients
            ingredients={ingredients}
            onDelete={(value: string) =>
              handleUpdateRecipe({ ingredients: ingredients.filter(({ name }) => name !== value) })
            }
          >
            <IngredientForm
              ingredients={allIngredients}
              totalIngredients={ingredients.length}
              saveIngredient={(ingredient: Ingredient) => {
                saveIngredient(ingredient.name)
                handleUpdateIngredients([
                  ...removeObjectFromArray<Ingredient>(ingredient, ingredients, 'name'),
                  ingredient,
                ])
              }}
            />
          </Ingredients>
        </Tab>
        <Tab title="Info">
          <label htmlFor="servings-input">servings</label>
          <TextInputWithConfirmation
            width="fit-content"
            id="servings-input"
            type="number"
            value={servings}
            onConfirm={(servings) => handleUpdateRecipe({ servings: Number(servings) })}
          />
          <label htmlFor="cooking-time-input">cooking time</label>
          <TextInputWithConfirmation
            id="cooking-time-input"
            value={cookingTime}
            onConfirm={(cookingTime) => handleUpdateRecipe({ cookingTime })}
          />
        </Tab>
      </Tabs>
    </FormContainer>
  )
}
