import { toIngredientRecord } from '@alwaystudios/recipe-bible-sdk'
import { pathOr } from 'ramda'
import { useState } from 'react'
import request from 'superagent'
import { useAuthContext } from '../auth/AuthContext'
import { API_BASE_URL } from '../contstants'

type UseIngredients = {
  getIngredients: () => Promise<void>
  saveIngredient: (ingredient: string) => Promise<void>
  ingredients: string[]
}

export const useIngredients = (): UseIngredients => {
  const { tokens } = useAuthContext()
  const idToken = pathOr(undefined, ['idToken'], tokens)

  const [ingredients, setIngredients] = useState<string[]>([])

  const getIngredients = (): Promise<void> =>
    request
      .get(`${API_BASE_URL}/ingredients`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => setIngredients(pathOr<string[]>([], ['body', 'data'], res)))
      .catch(() => setIngredients([]))

  const saveIngredient = async (ingredient: string): Promise<void> => {
    await request
      .put(`${API_BASE_URL}/ingredients`)
      .send({ ingredient: toIngredientRecord(ingredient) })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${idToken}`)
  }

  return {
    getIngredients,
    saveIngredient,
    ingredients,
  }
}
