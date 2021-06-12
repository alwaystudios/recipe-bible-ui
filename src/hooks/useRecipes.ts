import { Recipe } from '@alwaystudios/recipe-bible-sdk'
import { pathOr } from 'ramda'
import { useState } from 'react'
import request from 'superagent'
import { API_BASE_URL } from '../contstants'

type GetRecipes = {
  published?: boolean
  focused?: boolean | 'all'
  field?: string[]
}

type UseRecipes = {
  getRecipes: (params?: GetRecipes) => Promise<void> // eslint-disable-line no-unused-vars
  getRecipe: (title: string) => Promise<void> // eslint-disable-line no-unused-vars
  createRecipe: (token: string, title: string) => Promise<void> // eslint-disable-line no-unused-vars
  saveRecipe: (token: string, recipe: Recipe) => Promise<void> // eslint-disable-line no-unused-vars
  recipes: Recipe[]
  recipe: Recipe
  loading: boolean
  error: boolean
}

export const useRecipes = (): UseRecipes => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const getRecipes = ({ published, focused, field }: GetRecipes = {}): Promise<void> => {
    setLoading(true)
    setError(false)

    return request
      .get(`${API_BASE_URL}/recipes`)
      .query({ field, published, focused })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => setRecipes(pathOr<Recipe[]>([], ['body', 'data'], res)))
      .catch(() => {
        setRecipes([])
        setError(true)
      })
      .finally(() => setLoading(false))
  }

  const getRecipe = (title: string): Promise<void> => {
    setLoading(true)
    setError(false)

    return request
      .get(`${API_BASE_URL}/recipes/${title}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => setRecipe(pathOr<Recipe>(undefined, ['body', 'data'], res)))
      .catch(() => {
        setRecipe(undefined)
        setError(true)
      })
      .finally(() => setLoading(false))
  }

  const createRecipe = async (token: string, title: string): Promise<void> => {
    setLoading(true)

    await request
      .post(`${API_BASE_URL}/recipes`)
      .send({ title })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  const saveRecipe = async (token: string, recipe: Recipe): Promise<void> => {
    setLoading(true)

    await request
      .put(`${API_BASE_URL}/recipes/${recipe.title}`)
      .send(recipe)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  return { getRecipes, getRecipe, createRecipe, saveRecipe, recipes, recipe, loading, error }
}
