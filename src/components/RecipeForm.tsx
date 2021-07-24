import {
  Checkbox,
  Tab,
  Tabs,
  TextAreaWithConfirmation,
  TextInputWithConfirmation,
} from '@alwaystudios/as-ui-components'
import { CATEGORIES, Recipe, toSlug } from '@alwaystudios/recipe-bible-sdk'
import { Category, Ingredient, Step } from '@alwaystudios/recipe-bible-sdk/dist/types'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { removeFromArray, removeObjectFromArray, updateArrayUnq } from '../domain/recipeForm'
import { fromRecipeApi, toIngredientsApi, toStepsApi } from '../domain/recipeTransformer'
import { IngredientForm } from './IngredientForm'
import { Ingredients } from './Ingredients'
import { RecipeFormControls } from './RecipeFormControls'
import { RecipeImageForm } from './RecipeImageForm'
import { StepForm } from './StepForm'
import { Steps } from './Steps'
import { YouWillNeedForm } from './YouWillNeedForm'

const StepsContainer = styled.div`
  display: flex;
  flex-direction: row;

  & > div {
    flex-basis: 50%;
  }
`

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

const StoryContainer = styled.div`
  margin: 1rem 0 0 1rem;

  & > div {
    width: 50%;
  }
`

const LabelWithInputContainer = styled.div`
  padding: 1rem 0 0 1rem;
`

type Props = {
  recipe: Recipe
  updateRecipe: (updates: DeepPartial<Recipe>) => Promise<void>
  deleteRecipe: (title: string) => Promise<void>
  saveIngredient: (ingredient: string) => Promise<void>
  ingredients: string[]
}

export const RecipeForm: React.FC<Props> = ({
  recipe,
  updateRecipe,
  deleteRecipe,
  saveIngredient,
  ingredients: allIngredients,
}) => {
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
    <FormContainer
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault()
      }}
    >
      <h1>{title}</h1>
      <RecipeFormControls
        onDelete={() => deleteRecipe(toSlug(title)).then(() => history.push('/manage/recipes'))}
        onView={() => history.push(`/recipes/${toSlug(title)}`)}
        onPublish={() => handleUpdateRecipe({ metadata: { published: !published } })}
        onFocus={() => handleUpdateRecipe({ metadata: { focused: !focused } })}
        published={published}
        focused={focused}
      />
      <Tabs>
        <Tab title="Photo">
          <RecipeImageForm
            title={title}
            imgSrc={imgSrc}
            setImgSrc={(imgSrc: string) => handleUpdateRecipe({ imgSrc })}
          />
        </Tab>
        <Tab title="Story">
          <StoryContainer>
            <TextAreaWithConfirmation
              rows={8}
              value={story}
              onConfirm={(story: string) => handleUpdateRecipe({ story })}
            />
          </StoryContainer>
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
          <LabelWithInputContainer>
            <label htmlFor="fat-input">fat</label>
            <TextInputWithConfirmation
              id="fat-input"
              onConfirm={(fat) => handleUpdateRecipe({ nutrition: { fat } })}
              value={fat}
            />
          </LabelWithInputContainer>
          <LabelWithInputContainer>
            <label htmlFor="carbs-input">carbs</label>
            <TextInputWithConfirmation
              id="carbs-input"
              onConfirm={(carbs) => handleUpdateRecipe({ nutrition: { carbs } })}
              value={carbs}
            />
          </LabelWithInputContainer>
          <LabelWithInputContainer>
            <label htmlFor="protein-input">protein</label>
            <TextInputWithConfirmation
              id="protein-input"
              onConfirm={(protein) => handleUpdateRecipe({ nutrition: { protein } })}
              value={protein}
            />
          </LabelWithInputContainer>
        </Tab>
        <Tab title="You will need">
          <YouWillNeedForm
            setInput={setInput}
            input={input}
            onDelete={(value: string) =>
              handleUpdateRecipe({ youWillNeed: removeFromArray(value, youWillNeed) })
            }
            onUpdate={handleYouWillNeedUpdate}
            youWillNeed={youWillNeed}
          />
        </Tab>
        <Tab title="Steps">
          <StepsContainer>
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
          </StepsContainer>
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
          <LabelWithInputContainer>
            <label htmlFor="servings-input">servings</label>
            <TextInputWithConfirmation
              width="fit-content"
              id="servings-input"
              type="number"
              value={servings}
              onConfirm={(servings) => handleUpdateRecipe({ servings: Number(servings) })}
            />
          </LabelWithInputContainer>
          <LabelWithInputContainer>
            <label htmlFor="cooking-time-input">cooking time</label>
            <TextInputWithConfirmation
              id="cooking-time-input"
              value={cookingTime}
              onConfirm={(cookingTime) => handleUpdateRecipe({ cookingTime })}
            />
          </LabelWithInputContainer>
        </Tab>
      </Tabs>
    </FormContainer>
  )
}
