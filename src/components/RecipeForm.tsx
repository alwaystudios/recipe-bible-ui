import {
  Button,
  Checkbox,
  Tab,
  Tabs,
  TextAreaWithConfirmation,
} from '@alwaystudios/as-ui-components'
import { CATEGORIES, Recipe, toSlug } from '@alwaystudios/recipe-bible-sdk'
import { Category } from '@alwaystudios/recipe-bible-sdk/dist/types'
import styled from '@emotion/styled'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { fromRecipeApi } from '../domain/recipeTransformer'
import { RecipeImageForm } from './RecipeImageForm'

const Container = styled.div`
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
    metadata: { published, focused },
  } = fromRecipeApi(recipe)
  const history = useHistory()

  const handleUpdateRecipe = (updates: DeepPartial<Recipe>) => updateRecipe(updates)

  const handleCategories = (checked: boolean, category: string) => {
    if (checked) {
      handleUpdateRecipe({ categories: [category as Category, ...categories] })
    } else {
      handleUpdateRecipe({ categories: categories.filter((c) => c !== category) })
    }
  }

  return (
    <Container>
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
            className="text-area"
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
      </Tabs>
    </Container>
  )
}
