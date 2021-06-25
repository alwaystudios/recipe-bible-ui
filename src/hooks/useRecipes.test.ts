import { recipeTitleTransformer, testRecipe, toSlug } from '@alwaystudios/recipe-bible-sdk'
import { act, renderHook } from '@testing-library/react-hooks'
import { datatype, lorem } from 'faker'
import nock, { cleanAll, isDone } from 'nock'
import { LOCALHOST } from '../contstants'
import { useRecipes } from './useRecipes'
import * as AuthContext from '../auth/AuthContext'

const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')
const tokens = { idToken: datatype.uuid() }

describe('use recipes', () => {
  beforeEach(cleanAll)

  describe('get recipe', () => {
    it('udpate recipe', async () => {
      useAuthContext.mockReturnValue({ tokens } as any)

      const recipe = testRecipe()
      const payload = { data: recipe }
      nock(LOCALHOST)
        .get(`/recipes/${recipe.title}`)
        .reply(200, () => {
          return payload
        })

      const { result } = renderHook(() => useRecipes())

      await act(() => result.current.getRecipe(recipe.title))

      expect(result.current.recipe).toMatchObject(recipe)
      expect(isDone()).toBe(true)

      const story = 'updated'

      nock(LOCALHOST)
        .put(`/recipes/${recipe.title}`, { ...recipe, story })
        .matchHeader('authorization', `Bearer ${tokens.idToken}`)
        .reply(200, () => {
          return {
            status: 'ok',
          }
        })

      await act(() => result.current.updateRecipe({ story }))
      expect(result.current.recipe).toMatchObject({ ...recipe, story })

      expect(isDone()).toBe(true)
    })

    it('get recipe', async () => {
      const recipe = testRecipe()
      const payload = { data: recipe }
      nock(LOCALHOST)
        .get(`/recipes/${recipe.title}`)
        .reply(200, () => {
          return payload
        })

      const { result } = renderHook(() => useRecipes())

      expect(result.current.loading).toBe(false)

      await act(() => result.current.getRecipe(recipe.title))

      expect(result.current.recipe).toMatchObject(recipe)
      expect(result.current.loading).toBe(false)
      expect(isDone()).toBe(true)
    })

    it('handles errors', async () => {
      nock(LOCALHOST).get(`/recipes/my-recipe`).reply(500)

      const { result } = renderHook(() => useRecipes())

      expect(result.current.loading).toBe(false)

      await act(() => result.current.getRecipe('my-recipe'))

      expect(result.current.recipe).toBeUndefined()
      expect(result.current.loading).toBe(false)
      expect(isDone()).toBe(true)
    })
  })

  describe('get recipes', () => {
    it('get recipes', async () => {
      const data = [testRecipe(), testRecipe()]
      const payload = { data }
      nock(LOCALHOST)
        .get(`/recipes`)
        .reply(200, () => {
          return payload
        })

      const { result } = renderHook(() => useRecipes())

      expect(result.current.loading).toBe(false)

      await act(() => result.current.getRecipes())

      expect(result.current.recipes).toMatchObject(data)
      expect(result.current.loading).toBe(false)
      expect(isDone()).toBe(true)
    })

    it('get recipes with query string params', async () => {
      const published = 'all'
      const focused = false
      const field = ['title', 'imgSrc']
      const data = [testRecipe(), testRecipe()]
      const payload = { data }
      nock(LOCALHOST)
        .get(`/recipes`)
        .query({ field, published, focused })
        .reply(200, () => {
          return payload
        })

      const { result } = renderHook(() => useRecipes())

      expect(result.current.loading).toBe(false)

      await act(() => result.current.getRecipes({ field, published, focused }))

      expect(result.current.recipes).toMatchObject(data)
      expect(result.current.loading).toBe(false)
      expect(isDone()).toBe(true)
    })

    it('handles errors', async () => {
      nock(LOCALHOST).get(`/recipes`).reply(500)

      const { result } = renderHook(() => useRecipes())

      expect(result.current.loading).toBe(false)

      await act(() => result.current.getRecipes())

      expect(result.current.recipes).toEqual([])
      expect(result.current.loading).toBe(false)
      expect(isDone()).toBe(true)
    })
  })

  describe('create recipe', () => {
    it('creates a new recipe', async () => {
      const title = recipeTitleTransformer(lorem.words(3))
      const token = datatype.uuid()
      nock(LOCALHOST)
        .post(`/recipes`, { title: toSlug(title) })
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, () => {
          return {
            status: 'ok',
          }
        })

      const { result } = renderHook(() => useRecipes())

      await act(() => result.current.createRecipe(token, title))

      expect(isDone()).toBe(true)
    })
  })
})
