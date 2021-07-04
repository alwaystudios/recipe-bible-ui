import { act, renderHook } from '@testing-library/react-hooks'
import { datatype, lorem } from 'faker'
import nock, { cleanAll, isDone } from 'nock'
import { LOCALHOST } from '../contstants'
import { useIngredients } from './useIngredients'
import * as AuthContext from '../auth/AuthContext'
import { toIngredientRecord } from '@alwaystudios/recipe-bible-sdk'

const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')
const tokens = { idToken: datatype.uuid() }

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
      useAuthContext.mockReturnValue({ tokens } as any)
      const ingredient = 'My new ingredients'
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

      expect(isDone()).toBe(true)
    })
  })
})
