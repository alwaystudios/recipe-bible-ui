import { testRecipe } from '@alwaystudios/recipe-bible-sdk'
import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import { datatype, lorem } from 'faker'
import nock, { cleanAll, isDone } from 'nock'
import { LOCALHOST } from '../contstants'
import { useRecipes } from './useRecipes'

describe('use recipes', () => {
  beforeEach(() => {
    cleanup()
    cleanAll()
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

      expect(result.current.error).toBe(false)
      expect(result.current.loading).toBe(false)

      await act(() => result.current.getRecipes())

      expect(result.current.recipes).toMatchObject(data)
      expect(result.current.error).toBe(false)
      expect(result.current.loading).toBe(false)
      expect(isDone()).toBe(true)
    })

    it('get recipes with query string params', async () => {
      const published = false
      const focused = 'all'
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

      expect(result.current.error).toBe(false)
      expect(result.current.loading).toBe(false)

      await act(() => result.current.getRecipes({ field, published, focused }))

      expect(result.current.recipes).toMatchObject(data)
      expect(result.current.error).toBe(false)
      expect(result.current.loading).toBe(false)
      expect(isDone()).toBe(true)
    })

    it('handles errors', async () => {
      nock(LOCALHOST).get(`/recipes`).reply(500)

      const { result } = renderHook(() => useRecipes())

      expect(result.current.error).toBe(false)
      expect(result.current.loading).toBe(false)

      await act(() => result.current.getRecipes())

      expect(result.current.recipes).toEqual([])
      expect(result.current.error).toBe(true)
      expect(result.current.loading).toBe(false)
      expect(isDone()).toBe(true)
    })
  })

  describe('create recipe', () => {
    it('creates a new recipe', async () => {
      const title = lorem.word()
      const token = datatype.uuid()
      nock(LOCALHOST)
        .post(`/recipes`, { title })
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, () => {
          return {
            status: 'ok',
          }
        })

      const { result } = renderHook(() => useRecipes())

      expect(result.current.error).toBe(false)
      expect(result.current.loading).toBe(false)

      await act(() => result.current.createRecipe(token, title))

      expect(result.current.error).toBe(false)
      expect(result.current.loading).toBe(false)
      expect(isDone()).toBe(true)
    })

    it('handles errors', async () => {
      const title = lorem.word()
      const token = datatype.uuid()
      nock(LOCALHOST)
        .post(`/recipes`, { title })
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(500)

      const { result } = renderHook(() => useRecipes())

      expect(result.current.error).toBe(false)
      expect(result.current.loading).toBe(false)

      await act(() => result.current.createRecipe(token, title))

      expect(result.current.error).toBe(true)
      expect(result.current.loading).toBe(false)
      expect(isDone()).toBe(true)
    })
  })
})
