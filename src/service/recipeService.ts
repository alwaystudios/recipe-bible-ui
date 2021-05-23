import { Recipe } from '@alwaystudios/recipe-bible-sdk'
import { pathOr } from 'ramda'
import request from 'superagent'

export const getRecipes = (): Promise<Recipe[]> =>
  request
    .get(`${process.env.API_BASE_URL}/recipes`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((res) => pathOr([], ['body', 'data'], res))

export const saveRecipe = (token: string): Promise<string> =>
  request
    .get(`${process.env.API_BASE_URL}/recipes`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
