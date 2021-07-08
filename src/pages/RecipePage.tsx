import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { RecipeForm } from '../components/RecipeForm'
import { Recipe } from '../components/Recipe'
import { Spinner } from '../components/Spinner'
import { useAnalytics } from '../hooks/useAnalytics'
import { useRecipes } from '../hooks/useRecipes'
import { BackToLink } from '../components/BackToLink'
import styled from '@emotion/styled'
import { Http404 } from './404'

type Props = {
  edit?: boolean
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin-bottom: 1rem;
`

export const RecipePage: React.FC<Props> = ({ edit = false }) => {
  const { name } = useParams<{ name: string }>()
  const { pageView } = useAnalytics()
  const { getRecipe, recipe, loading, updateRecipe, deleteRecipe } = useRecipes()

  useEffect(() => {
    if (!edit) {
      pageView()
    }
    getRecipe(name)
  }, [])

  const Component = edit ? RecipeForm : Recipe
  const Props = edit ? { updateRecipe, deleteRecipe } : {}

  return (
    <Spinner isLoading={loading}>
      <Container>
        <BackToLink to="/recipes" text="recipes" />
      </Container>
      {recipe ? <Component recipe={recipe} {...Props} /> : <Http404 />}
    </Spinner>
  )
}
