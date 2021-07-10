import { act, renderHook } from '@testing-library/react-hooks'
import { datatype } from 'faker'
import nock, { cleanAll, isDone } from 'nock'
import { LOCALHOST } from '../contstants'
import { useAdverts } from './useAdverts'
import * as AuthContext from '../auth/AuthContext'
import { testAdvert } from '@alwaystudios/recipe-bible-sdk'
import { testAuthContext, testTokens } from '../../test/testAuthContext'

const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')
const tokens = testTokens({ idToken: datatype.uuid() })

describe('use adverts', () => {
  beforeEach(cleanAll)

  describe('get adverts', () => {
    it('get adverts', async () => {
      useAuthContext.mockReturnValue(testAuthContext({ tokens }))
      const data = [testAdvert(), testAdvert()]
      const payload = { data }
      nock(LOCALHOST)
        .get(`/adverts`)
        .reply(200, () => {
          return payload
        })

      const { result } = renderHook(() => useAdverts())

      await act(() => result.current.getAdverts())

      expect(result.current.loading).toBe(false)
      expect(result.current.adverts).toMatchObject(data)
      expect(isDone()).toBe(true)
    })

    it('handles errors', async () => {
      nock(LOCALHOST).get(`/adverts`).reply(500)

      const { result } = renderHook(() => useAdverts())

      await act(() => result.current.getAdverts())

      expect(result.current.loading).toBe(false)
      expect(result.current.adverts).toEqual([])
      expect(isDone()).toBe(true)
    })
  })

  describe('save advert', () => {
    it('save an advert', async () => {
      useAuthContext.mockReturnValue(testAuthContext({ tokens }))
      const advert = testAdvert()
      nock(LOCALHOST)
        .put(`/adverts`, advert)
        .matchHeader('authorization', `Bearer ${tokens.idToken}`)
        .reply(200, () => {
          return {
            status: 'ok',
          }
        })

      const { result } = renderHook(() => useAdverts())

      await act(() => result.current.saveAdvert(advert))

      expect(isDone()).toBe(true)
    })
  })

  describe('delete advert', () => {
    it('deletes an advert', async () => {
      useAuthContext.mockReturnValue(testAuthContext({ tokens }))
      const advert = testAdvert()
      nock(LOCALHOST)
        .delete(`/adverts`, advert)
        .matchHeader('authorization', `Bearer ${tokens.idToken}`)
        .reply(200, () => {
          return {
            status: 'ok',
          }
        })

      const { result } = renderHook(() => useAdverts())

      await act(() => result.current.deleteAdvert(advert))

      expect(isDone()).toBe(true)
    })
  })
})
