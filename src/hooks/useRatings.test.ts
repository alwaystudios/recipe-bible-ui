import { testRecipeRating } from '@alwaystudios/recipe-bible-sdk'
import { act, renderHook } from '@testing-library/react-hooks'
import nock, { cleanAll, isDone } from 'nock'
import { LOCALHOST } from '../contstants'
import { useRatings } from './useRatings'

describe('use ratings', () => {
  beforeEach(cleanAll)

  describe('set recipe rating', () => {
    it('set recipe rating', async () => {
      const data = [1]
      const payload = { data }
      nock(LOCALHOST)
        .get(`/recipe-ratings/my-recipe`)
        .reply(200, () => {
          return payload
        })

      const { result } = renderHook(() => useRatings())

      await act(() => result.current.getRatings('my-recipe'))

      expect(result.current.ratings).toMatchObject(data)

      nock(LOCALHOST)
        .post(`/recipe-ratings/my-recipe`)
        .reply(200, () => {
          return payload
        })

      await act(() => result.current.setRating('my-recipe', 5))
      expect(result.current.rating).toBe(5)

      expect(isDone()).toBe(true)
    })

    it('handles errors', async () => {
      nock(LOCALHOST).post(`/recipe-ratings/my-recipe`).reply(500)

      const { result } = renderHook(() => useRatings())

      await act(() => result.current.setRating('my-recipe', 5))

      expect(result.current.rating).toEqual(undefined)
      expect(isDone()).toBe(true)
    })
  })

  describe('get recipe ratings', () => {
    it('get recipe ratings', async () => {
      const data = [2, 2, 2, 2, 2]
      const payload = { data }
      nock(LOCALHOST)
        .get(`/recipe-ratings/my-recipe`)
        .reply(200, () => {
          return payload
        })

      const { result } = renderHook(() => useRatings())

      await act(() => result.current.getRatings('my-recipe'))

      expect(result.current.ratings).toMatchObject(data)
      expect(result.current.rating).toBe(2)
      expect(isDone()).toBe(true)
    })

    it('handles errors', async () => {
      nock(LOCALHOST).get(`/recipe-ratings/my-recipe`).reply(500)

      const { result } = renderHook(() => useRatings())

      await act(() => result.current.getRatings('my-recipe'))

      expect(result.current.ratings).toEqual([])
      expect(isDone()).toBe(true)
    })
  })

  describe('get all recipe ratings', () => {
    it('get all recipe ratings', async () => {
      const data = [testRecipeRating(), testRecipeRating()]
      const payload = { data }
      nock(LOCALHOST)
        .get(`/recipe-ratings`)
        .reply(200, () => {
          return payload
        })

      const { result } = renderHook(() => useRatings())

      await act(() => result.current.getAllRatings())

      expect(result.current.allRatings).toMatchObject(data)
      expect(isDone()).toBe(true)
    })

    it('handles errors', async () => {
      nock(LOCALHOST).get(`/recipe-ratings`).reply(500)

      const { result } = renderHook(() => useRatings())

      await act(() => result.current.getAllRatings())

      expect(result.current.allRatings).toEqual([])
      expect(isDone()).toBe(true)
    })
  })
})
