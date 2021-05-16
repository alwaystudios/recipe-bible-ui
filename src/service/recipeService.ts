import { pathOr } from 'ramda'
import request from 'superagent'

export const getRecipes = (token: string): Promise<Recipe[]> =>
  request
    .get(`${process.env.API_BASE_URL}/recipes`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return pathOr([], ['body', 'data'], res)
    })
    .catch(() => {
      return []
    })
