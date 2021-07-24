import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { RecipeForm } from '../components/RecipeForm'
import { Spinner } from '../components/Spinner'
import { useRecipes } from '../hooks/useRecipes'
import { BackToLink } from '../components/BackToLink'
import styled from '@emotion/styled'
import { Http404 } from './404'
import { Recipe as RecipeType } from '@alwaystudios/recipe-bible-sdk'
import { useIngredients } from '../hooks/useIngredients'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin-bottom: 1rem;
`

export const ManageRecipePage: React.FC = () => {
  const history = useHistory()
  const { name } = useParams<{ name: string }>()
  const {
    getRecipe,
    recipe,
    loading,
    updateRecipe,
    deleteRecipe,
    authError: useRecipesAuthError,
  } = useRecipes()
  const {
    saveIngredient,
    getIngredients,
    ingredients,
    authError: useIngredientsAuthError,
  } = useIngredients()

  useEffect(() => {
    if (useRecipesAuthError || useIngredientsAuthError) {
      history.push('/account')
    }
  }, [useRecipesAuthError, useIngredientsAuthError])

  const [didMount, setDidMount] = useState(false)
  useEffect(() => {
    getIngredients()
    getRecipe(name)
    setDidMount(true)
    return () => setDidMount(false)
  }, [])

  if (!didMount) {
    return null
  }

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
          saveIngredient={saveIngredient}
          ingredients={ingredients}
        />
      ) : (
        <Http404 />
      )}
    </Spinner>
  )
}
