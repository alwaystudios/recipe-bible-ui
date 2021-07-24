import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { RecipeForm } from '../components/RecipeForm'
import { Spinner } from '../components/Spinner'
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

export const ManageRecipePage: React.FC = () => {
  const history = useHistory()
  const { name } = useParams<{ name: string }>()
  const { getRecipe, recipe, loading, updateRecipe, deleteRecipe, authError } = useRecipes()

  useEffect(() => {
    getRecipe(name)
  }, [])

  useEffect(() => {
    if (authError) {
      history.push('/account')
    }
  }, [authError])

  return (
    <Spinner isLoading={loading}>
      <Container>
        <BackToLink to="/recipes" text="recipes" />
      </Container>
      {recipe ? (
        <RecipeForm
          recipe={recipe as RecipeType}
          updateRecipe={updateRecipe}
          deleteRecipe={deleteRecipe}
        />
      ) : (
        <Http404 />
      )}
    </Spinner>
  )
}
