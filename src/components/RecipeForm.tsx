import { Tab, Tabs } from '@alwaystudios/as-ui-components'
import { Recipe } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React from 'react'
import { fromRecipeApi } from '../domain/recipeTransformer'
import { RecipeImageForm } from './RecipeImageForm'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`

type Props = {
  recipe: Recipe
  updateRecipe: (updates: Partial<Recipe>) => void
}

export const RecipeForm: React.FC<Props> = ({ recipe, updateRecipe }) => {
  const { title, imgSrc } = fromRecipeApi(recipe)

  const handleUpdateRecipe = (updates: Partial<Recipe>) => updateRecipe(updates)

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
