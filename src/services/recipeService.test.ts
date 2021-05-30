import { testRecipe } from '@alwaystudios/recipe-bible-sdk'
import { datatype } from 'faker'
import nock, { cleanAll, isDone } from 'nock'
import { API_BASE_URL } from '../contstants'
import { getRecipes, saveRecipe } from './recipeService'

describe('recipe service', () => {
  beforeEach(cleanAll)

  it('GET /recipes/', async () => {
    const data = [testRecipe(), testRecipe()]
    const payload = { data }
    nock(API_BASE_URL || 'http://localhost')
      .get(`/recipes`)
      .reply(200, () => {
        return payload
      })

    const recipe = await getRecipes()

    expect(recipe).toMatchObject(data)
    expect(isDone()).toBe(true)
  })

  it('POST /recipes/{title}', async () => {
    const recipe = testRecipe()
    const token = datatype.uuid()
    nock(API_BASE_URL || 'http://localhost')
      .post(`/recipes/${recipe.title}`, recipe)
      .matchHeader('authorization', `Bearer ${token}`)
      .reply(200, () => {
        return {
          status: 'ok',
        }
      })

    const response = await saveRecipe(token, recipe)

    expect(response).toEqual({
      status: 'ok',
    })
    expect(isDone()).toBe(true)
  })
})
