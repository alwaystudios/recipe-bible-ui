import { Tab, Tabs } from '@alwaystudios/as-ui-components'
import { Recipe } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React from 'react'
import { useAuthContext } from '../auth/AuthContext'
import { fromRecipeApi } from '../domain/recipeTransformer'
import { RecipeImageForm } from './RecipeImageForm'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`

type Props = {
  recipe: Recipe
  updateRecipe: (updates: Partial<Recipe>) => void // eslint-disable-line no-unused-vars
  saveRecipe: (token: string, recipe: Recipe) => Promise<void> // eslint-disable-line no-unused-vars
}

export const RecipeForm: React.FC<Props> = ({ recipe, updateRecipe, saveRecipe }) => {
  const { tokens } = useAuthContext()
  const { title, imgSrc } = fromRecipeApi(recipe)

  const handleUpdateRecipe = (updates: Partial<Recipe>) => {
    updateRecipe(updates)
    saveRecipe(tokens.idToken, { ...recipe, ...updates })
  }

  return (
    <Container>
      <h1>{title}</h1>
      <Tabs>
        <Tab title="Photo">
          <RecipeImageForm
            title={title}
            imgSrc={imgSrc}
            setImgSrc={(imgSrc: string) => handleUpdateRecipe({ imgSrc })}
          />
        </Tab>
        <Tab title="Steps">
          <>todo</>
        </Tab>
      </Tabs>
    </Container>
  )
}
