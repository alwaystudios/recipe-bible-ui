import request, { SuperAgentRequest } from 'superagent'
import { API_URI } from './config'

export const getRecipes = (): SuperAgentRequest => request.get(`${API_URI}/recipe`)

export const postCreateRecipe = (
  recipe: { title: string },
  accessToken: string,
): SuperAgentRequest =>
  request
    .post(`${API_URI}/recipe`)
    .send(recipe)
    .set('Access-Control-Allow-Origin', '*')
    .set('Content-Type', 'application/json')
    .set('authorization', `Bearer ${accessToken}`)
