import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Recipe } from '../components/Recipe'
import { Spinner } from '../components/Spinner'
import { fromRecipeApi } from '../domain/recipeTransformer'
import { useAnalytics } from '../hooks/useAnalytics'
import { useRecipes } from '../hooks/useRecipes'

export const RecipePage: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const { pageView } = useAnalytics()
  const { getRecipe, recipe, loading } = useRecipes()

  useEffect(() => {
    pageView()
    getRecipe(name)
  }, [])

  return (
    <Spinner isLoading={loading}>{recipe && <Recipe recipe={fromRecipeApi(recipe)} />}</Spinner>
  )
}
