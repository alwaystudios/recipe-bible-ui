import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { RecipeForm } from '../components/RecipeForm'
import { Recipe } from '../components/Recipe'
import { Spinner } from '../components/Spinner'
import { useAnalytics } from '../hooks/useAnalytics'
import { useRecipes } from '../hooks/useRecipes'

type Props = {
  edit?: boolean
}

export const RecipePage: React.FC<Props> = ({ edit = false }) => {
  const { name } = useParams<{ name: string }>()
  const { pageView } = useAnalytics()
  const { getRecipe, recipe, loading, updateRecipe } = useRecipes()

  useEffect(() => {
    if (!edit) {
      pageView()
    }
    getRecipe(name)
  }, [])

  const Component = edit ? RecipeForm : Recipe
  const Props = edit ? { updateRecipe } : {}

  return <Spinner isLoading={loading}>{recipe && <Component recipe={recipe} {...Props} />}</Spinner>
}
