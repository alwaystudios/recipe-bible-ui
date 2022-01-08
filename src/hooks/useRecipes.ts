import { normalizeRecipe, Recipe, toSlug } from '@alwaystudios/recipe-bible-sdk'
import { mergeDeepRight, pathOr } from 'ramda'
import { useState } from 'react'
import request from 'superagent'
import { useAuthContext } from '../auth/AuthContext'
import { API_BASE_URL } from '../constants'

type GetRecipes = {
  published?: boolean | 'all'
  focused?: boolean
  field?: string[]
}

export type UseRecipes = {
  updateRecipe: (updates: DeepPartial<Recipe>) => Promise<void>
  getRecipes: (params?: GetRecipes) => Promise<void>
  getRecipe: (title: string) => Promise<void>
  createRecipe: (title: string) => Promise<void>
  deleteRecipe: (title: string) => Promise<void>
  clearErrors: () => void
  recipes: Recipe[]
  recipe: Partial<Recipe>
  loading: boolean
  error: boolean
  authError: boolean
}

export const useRecipes = (): UseRecipes => {
  const { tokens } = useAuthContext()
  const idToken = pathOr(undefined, ['idToken'], tokens)

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [recipe, setRecipe] = useState<Partial<Recipe> | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [authError, setAuthError] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const getRecipes = ({ published, focused, field }: GetRecipes = {}): Promise<void> => {
    setLoading(true)

    return request
      .get(`${API_BASE_URL}/recipes`)
      .query({ field, published, focused })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => setRecipes(pathOr<Recipe[]>([], ['body', 'data'], res).map(normalizeRecipe)))
      .catch(() => setRecipes([]))
      .finally(() => setLoading(false))
  }

  const getRecipe = (title: string): Promise<void> => {
    setLoading(true)

    return request
      .get(`${API_BASE_URL}/recipes/${toSlug(title)}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => setRecipe(normalizeRecipe(pathOr<Recipe>(undefined, ['body', 'data'], res))))
      .catch(() => setRecipe(undefined))
      .finally(() => setLoading(false))
  }

  const createRecipe = async (title: string): Promise<void> => {
    setError(false)
    setAuthError(false)

    const slug = toSlug(title)
    if (slug === 'create') {
      throw new Error('invalid recipe name')
    }

    return request
      .post(`${API_BASE_URL}/recipes`)
      .send({ title: slug })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${idToken}`)
      .then(() => {
        setRecipe({ title: slug })
      })
      .catch((err) => {
        setRecipe(undefined)
        setError(true)
        setAuthError(err.message === 'Unauthorized')
      })
  }

  const deleteRecipe = async (title: string): Promise<void> => {
    setAuthError(false)

    await request
      .delete(`${API_BASE_URL}/recipes/${toSlug(title)}`)
      .send({ title: toSlug(title) })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${idToken}`)
      .catch((err) => {
        setAuthError(err.message === 'Unauthorized')
      })
  }

  const updateRecipe = async (updates: DeepPartial<Recipe>): Promise<void> => {
    setAuthError(false)

    if (!recipe) {
      return
    }

    const updatedRecipe = mergeDeepRight(recipe, updates) as Recipe
    setRecipe(updatedRecipe)

    await request
      .put(`${API_BASE_URL}/recipes/${toSlug(recipe.title)}`)
      .send(normalizeRecipe(updatedRecipe))
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${idToken}`)
      .catch((err) => {
        setAuthError(err.message === 'Unauthorized')
      })
  }

  return {
    clearErrors: () => {
      setError(false)
      setAuthError(false)
    },
    updateRecipe,
    getRecipes,
    getRecipe,
    createRecipe,
    deleteRecipe,
    recipes,
    recipe,
    loading,
    error,
    authError,
  }
}
