import { Recipe, toSlug } from '@alwaystudios/recipe-bible-sdk'
import { pathOr } from 'ramda'
import { useState } from 'react'
import request from 'superagent'
import { useAuthContext } from '../auth/AuthContext'
import { API_BASE_URL } from '../contstants'

type GetRecipes = {
  published?: boolean | 'all'
  focused?: boolean
  field?: string[]
}

type UseRecipes = {
  updateRecipe: (updates: Partial<Recipe>) => void
  getRecipes: (params?: GetRecipes) => Promise<void>
  getRecipe: (title: string) => Promise<void>
  createRecipe: (token: string, title: string) => Promise<void>
  recipes: Recipe[]
  recipe: Recipe
  loading: boolean
}

export const useRecipes = (): UseRecipes => {
  const { tokens } = useAuthContext()

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const getRecipes = ({ published, focused, field }: GetRecipes = {}): Promise<void> => {
    setLoading(true)

    return request
      .get(`${API_BASE_URL}/recipes`)
      .query({ field, published, focused })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => setRecipes(pathOr<Recipe[]>([], ['body', 'data'], res)))
      .catch(() => setRecipes([]))
      .finally(() => setLoading(false))
  }

  const getRecipe = (title: string): Promise<void> => {
    setLoading(true)

    return request
      .get(`${API_BASE_URL}/recipes/${toSlug(title)}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => setRecipe(pathOr<Recipe>(undefined, ['body', 'data'], res)))
      .catch(() => setRecipe(undefined))
      .finally(() => setLoading(false))
  }

  const createRecipe = async (token: string, title: string): Promise<void> => {
    await request
      .post(`${API_BASE_URL}/recipes`)
      .send({ title: toSlug(title) })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
  }

  const updateRecipe = async (updates: Partial<Recipe>): Promise<void> => {
    if (!recipe) {
      return
    }

    const updatedRecipe = { ...recipe, ...updates }

    await request
      .put(`${API_BASE_URL}/recipes/${toSlug(recipe.title)}`)
      .send(recipe)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokens.idToken}`)

    setRecipe(updatedRecipe)
  }

  return {
    updateRecipe,
    getRecipes,
    getRecipe,
    createRecipe,
    recipes,
    recipe,
    loading,
  }
}
