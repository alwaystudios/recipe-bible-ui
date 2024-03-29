import React from 'react'
import { render } from '@testing-library/react'
import { AuthContext, AuthContextType, AuthProvider } from './AuthContext'
import * as useAuthModule from '../hooks/useAuth'
import { testUser } from '@alwaystudios/recipe-bible-sdk'
import { datatype } from 'faker'

const dateNow = 12345
jest.spyOn(Date, 'now').mockReturnValue(dateNow)

const login = jest.fn()
const logout = jest.fn()
const handleAuthentication = jest.fn()
const tokens = { accessToken: '1234', idToken: '4567', expiresAt: 12345 }

const useAuth = jest.spyOn(useAuthModule, 'useAuth')
let valueProp: AuthContextType

describe('auth context', () => {
  beforeEach(jest.clearAllMocks)

  test.each([
    [testUser({ 'https://recipebible.net/roles': ['admin', 'some other role'] }), true],
    [testUser({ 'https://recipebible.net/roles': ['admin'] }), true],
    [testUser({ 'https://recipebible.net/roles': [] }), false],
    [testUser({ 'https://recipebible.net/roles': ['user'] }), false],
  ])('should contain the correct values given the user role', (user, isAdmin) => {
    const sessionId = datatype.uuid()
    useAuth.mockReturnValue({
      sessionId,
      user,
      tokens,
      login,
      logout,
      handleAuthentication,
    })

    const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>

    render(
      <AuthContext.Consumer>
        {(value) => {
          valueProp = value
          return <span>Received: {JSON.stringify(value)}</span>
        }}
      </AuthContext.Consumer>,
      { wrapper }
    )

    expect(valueProp.user).toEqual({ ...user, isAdmin })
    expect(valueProp.sessionId).toEqual(sessionId)
    expect(valueProp.tokens).toEqual(tokens)
    expect(valueProp.login).toEqual(login)
    expect(valueProp.logout).toEqual(logout)
    expect(valueProp.handleAuthentication).toEqual(handleAuthentication)
    expect(valueProp.tokenExpired).toBe(false)
    expect(useAuth).toHaveBeenCalledTimes(1)
  })

  it('should contain the correct values for a guest user', () => {
    useAuth.mockReturnValue({
      sessionId: undefined,
      user: undefined,
      tokens: undefined,
      login,
      logout,
      handleAuthentication,
    })

    const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>

    render(
      <AuthContext.Consumer>
        {(value) => {
          valueProp = value
          return <span>Received: {JSON.stringify(value)}</span>
        }}
      </AuthContext.Consumer>,
      { wrapper }
    )

    expect(valueProp.user).toEqual(undefined)
    expect(valueProp.tokens).toEqual(undefined)
    expect(valueProp.login).toEqual(login)
    expect(valueProp.logout).toEqual(logout)
    expect(valueProp.handleAuthentication).toEqual(handleAuthentication)
    expect(valueProp.tokenExpired).toBe(true)
    expect(useAuth).toHaveBeenCalledTimes(1)
  })

  it('should expire the token', () => {
    useAuth.mockReturnValue({
      sessionId: datatype.uuid(),
      user: testUser(),
      tokens: { ...tokens, expiresAt: dateNow - 1 },
      login,
      logout,
      handleAuthentication,
    })

    const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>

    render(
      <AuthContext.Consumer>
        {(value) => {
          valueProp = value
          return <span>Received: {JSON.stringify(value)}</span>
        }}
      </AuthContext.Consumer>,
      { wrapper }
    )

    expect(valueProp.tokenExpired).toBe(true)
  })
})
