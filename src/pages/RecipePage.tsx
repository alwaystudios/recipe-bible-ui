import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Recipe } from '../components/Recipe'
import { Spinner } from '../components/Spinner'
import { useAnalytics } from '../hooks/useAnalytics'
import { useRecipes } from '../hooks/useRecipes'
import { BackToLink } from '../components/BackToLink'
import styled from '@emotion/styled'
import { Http404 } from './404'
import { Recipe as RecipeType } from '@alwaystudios/recipe-bible-sdk'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin-bottom: 1rem;
`

export const RecipePage: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const { pageView } = useAnalytics()
  const { getRecipe, recipe, loading } = useRecipes()

  useEffect(() => {
    pageView()
    getRecipe(name)
  }, [])

  return (
    <Spinner isLoading={loading}>
      <Container>
        <BackToLink to="/recipes" text="recipes" />
      </Container>
      {recipe ? <Recipe recipe={recipe as RecipeType} /> : <Http404 />}
    </Spinner>
  )
}
