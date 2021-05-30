import { Recipe } from '@alwaystudios/recipe-bible-sdk'
import { pathOr } from 'ramda'
import request from 'superagent'
import { API_BASE_URL } from '../contstants'

export const getRecipes = (): Promise<Recipe[]> =>
  request
    .get(`${API_BASE_URL}/recipes`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((res) => pathOr([], ['body', 'data'], res))

export const saveRecipe = (token: string, recipe: Recipe): Promise<string> =>
  request
    .post(`${API_BASE_URL}/recipes/${recipe.title}`)
    .send(recipe)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
