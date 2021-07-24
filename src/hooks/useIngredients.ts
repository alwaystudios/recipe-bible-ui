import { toIngredientRecord } from '@alwaystudios/recipe-bible-sdk'
import { pathOr } from 'ramda'
import { useState } from 'react'
import request from 'superagent'
import { useAuthContext } from '../auth/AuthContext'
import { API_BASE_URL } from '../constants'

export type UseIngredients = {
  getIngredients: () => Promise<void>
  saveIngredient: (ingredient: string) => Promise<void>
  ingredients: string[]
  loading: boolean
  authError: boolean
}

export const useIngredients = (): UseIngredients => {
  const { tokens } = useAuthContext()
  const idToken = pathOr(undefined, ['idToken'], tokens)
  const [loading, setLoading] = useState<boolean>(false)
  const [authError, setAuthError] = useState<boolean>(false)
  const [ingredients, setIngredients] = useState<string[]>([])

  const getIngredients = (): Promise<void> => {
    setLoading(true)
    return request
      .get(`${API_BASE_URL}/ingredients`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => setIngredients(pathOr<string[]>([], ['body', 'data'], res)))
      .catch(() => setIngredients([]))
      .finally(() => setLoading(false))
  }

  const saveIngredient = async (ingredient: string): Promise<void> => {
    setAuthError(false)

    await request
      .put(`${API_BASE_URL}/ingredients`)
      .send({ ingredient: toIngredientRecord(ingredient) })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${idToken}`)
      .catch((err) => {
        setAuthError(err.message === 'Unauthorized')
      })
    setIngredients([...ingredients, ingredient])
  }

  return {
    getIngredients,
    saveIngredient,
    ingredients,
    loading,
    authError,
  }
}
