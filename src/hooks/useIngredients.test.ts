import { act, renderHook } from '@testing-library/react-hooks'
import { datatype, lorem } from 'faker'
import nock, { cleanAll, isDone } from 'nock'
import { LOCALHOST } from '../contstants'
import { useIngredients } from './useIngredients'
import * as AuthContext from '../auth/AuthContext'
import { toIngredientRecord } from '@alwaystudios/recipe-bible-sdk'
import { testAuthContext, testTokens } from '../../test/testAuthContext'

const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')
const tokens = testTokens({ idToken: datatype.uuid() })

describe('use ingredients', () => {
  beforeEach(cleanAll)

  describe('get ingredients', () => {
    it('get ingredients', async () => {
      const data = [lorem.word(), lorem.word()]
      const payload = { data }
      nock(LOCALHOST)
        .get(`/ingredients`)
        .reply(200, () => {
          return payload
        })

      const { result } = renderHook(() => useIngredients())

      await act(() => result.current.getIngredients())

      expect(result.current.loading).toBe(false)
      expect(result.current.ingredients).toMatchObject(data)
      expect(isDone()).toBe(true)
    })

    it('handles errors', async () => {
      nock(LOCALHOST).get(`/ingredients`).reply(500)

      const { result } = renderHook(() => useIngredients())

      await act(() => result.current.getIngredients())

      expect(result.current.loading).toBe(false)
      expect(result.current.ingredients).toEqual([])
      expect(isDone()).toBe(true)
    })
  })

  describe('save ingredient', () => {
    it('save an ingredient', async () => {
      useAuthContext.mockReturnValue(testAuthContext({ tokens }))
      const ingredient = 'My new ingredient'
      nock(LOCALHOST)
        .put(`/ingredients`, { ingredient: toIngredientRecord(ingredient) })
        .matchHeader('authorization', `Bearer ${tokens.idToken}`)
        .reply(200, () => {
          return {
            status: 'ok',
          }
        })

      const { result } = renderHook(() => useIngredients())

      await act(() => result.current.saveIngredient(ingredient))

      expect(result.current.authError).toBe(false)
      expect(result.current.ingredients).toEqual([ingredient])
      expect(isDone()).toBe(true)
    })

    it('handles authentication errors', async () => {
      useAuthContext.mockReturnValue(testAuthContext({ tokens }))
      const ingredient = 'My new ingredients'
      nock(LOCALHOST)
        .put(`/ingredients`, { ingredient: toIngredientRecord(ingredient) })
        .matchHeader('authorization', `Bearer ${tokens.idToken}`)
        .reply(401)

      const { result } = renderHook(() => useIngredients())

      await act(() => result.current.saveIngredient(ingredient))

      expect(result.current.authError).toBe(true)
      expect(isDone()).toBe(true)
    })
  })
})
