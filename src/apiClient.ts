import { Recipe } from '@alwaystudios/recipe-bible-sdk'
import { useAuth0 } from '@auth0/auth0-react'
import request, { SuperAgentRequest } from 'superagent'

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/v2'
    : 'http://todo-somewhere-on-aws/api/v2'

// todo: make this into a hook with state
export const getAccessToken = async (): Promise<string | null> => {
  const { getAccessTokenSilently } = useAuth0()
  const accessToken = await getAccessTokenSilently({
    audience: `https://dev-27x9tbv3.eu.auth0.com/api/v2/`,
    scope: 'read:current_user',
  }).catch(() => {
    return null
  })

  return accessToken
}

export const getRecipes = (): SuperAgentRequest => request.get(`${BASE_URL}/recipe`)

export const postCreateRecipe = (recipe: Recipe, accessToken: string): SuperAgentRequest =>
  request
    .post(`${BASE_URL}/recipe`)
    .send(recipe)
    .set('Access-Control-Allow-Origin', '*')
    .set('Content-Type', 'application/json')
    .set('authorization', `Bearer ${accessToken}`)
