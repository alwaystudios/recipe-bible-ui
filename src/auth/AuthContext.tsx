import { User } from '@alwaystudios/recipe-bible-sdk'
import { pathOr } from 'ramda'
import React, { createContext } from 'react'
import { useAuth } from '../hooks/useAuth'

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<{
  user: User
  tokens: any
  login: any
  logout: any
  handleAuthentication: any
  tokenExpired: boolean
}>({
  user: undefined,
  tokens: undefined,
  login: undefined,
  logout: undefined,
  handleAuthentication: undefined,
  tokenExpired: true,
})

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const { user, login, logout, handleAuthentication, tokens } = useAuth()

  const expiresAt = pathOr(0, ['expiresAt'], tokens)
  const tokenExpired = Date.now() > expiresAt

  return (
    <AuthContext.Provider
      value={{ user, tokens, login, logout, handleAuthentication, tokenExpired }}
    >
      {children}
    </AuthContext.Provider>
  )
}
