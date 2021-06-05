import { act, renderHook } from '@testing-library/react-hooks'
import auth0 from 'auth0-js'
import { mocked } from 'ts-jest/utils'
import * as auth0Module from '../auth/auth0'
import { AUTH0_DOMAIN, AUTH0_CLIENTID, AUTH0_CALLBACK, BASE_URL } from '../contstants'
import { useAuth } from './useAuth'

const setAuth0Session = jest.spyOn(auth0Module, 'setAuth0Session').mockReturnValue(undefined)

const mockAuth = mocked(auth0)

const authorize = jest.fn()
const logout = jest.fn()
const parseHash = jest.fn()

// eslint-disable-next-line functional/immutable-data
mockAuth.WebAuth = jest.fn().mockImplementation(() => ({
  authorize,
  logout,
  parseHash,
}))

describe('useAuth', () => {
  beforeEach(jest.clearAllMocks)

  it('should default to not authenticated', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toBe(undefined)
    expect(result.current.tokens).toBe(undefined)

    expect(mockAuth.WebAuth).toHaveBeenCalledTimes(1)
    expect(mockAuth.WebAuth).toHaveBeenCalledWith({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENTID,
      redirectUri: AUTH0_CALLBACK,
      responseType: 'token id_token',
      scope: 'openid profile email',
    })
  })

  it('should handle login', () => {
    authorize.mockReturnValueOnce(undefined)
    const { result } = renderHook(() => useAuth())

    act(() => result.current.login())

    expect(authorize).toHaveBeenCalledTimes(1)
  })

  it('should handle logout', () => {
    logout.mockReturnValueOnce(undefined)
    const { result } = renderHook(() => useAuth())

    act(() => result.current.logout())

    expect(logout).toHaveBeenCalledTimes(1)
    expect(logout).toHaveBeenCalledWith({
      returnTo: BASE_URL,
    })
    expect(result.current.sessionId).toBe(undefined)
    expect(result.current.user).toBe(undefined)
    expect(result.current.tokens).toBe(undefined)
  })

  it('should handle authentication', () => {
    parseHash.mockReturnValueOnce(undefined)
    const { result } = renderHook(() => useAuth())

    act(() => result.current.handleAuthentication())

    expect(parseHash).toHaveBeenCalledTimes(1)
    expect(setAuth0Session).toHaveBeenCalledTimes(1)
  })
})
