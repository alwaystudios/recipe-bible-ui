import { Recipe } from '@alwaystudios/recipe-bible-sdk'
import request, { SuperAgentRequest } from 'superagent'

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/v2'
    : 'http://todo-somewhere-on-aws/api/v2'

export const getRecipes = (): SuperAgentRequest => request.get(`${BASE_URL}/recipe`)

export const postCreateRecipe = (recipe: Recipe, accessToken: string): SuperAgentRequest =>
  request
    .post(`${BASE_URL}/recipe`)
    .send(recipe)
    .set('Access-Control-Allow-Origin', '*')
    .set('Content-Type', 'application/json')
    .set('authorization', `Bearer ${accessToken}`)
