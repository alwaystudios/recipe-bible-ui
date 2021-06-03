import { User } from '@alwaystudios/recipe-bible-sdk'
import { pathOr } from 'ramda'
import React, { createContext } from 'react'
import { useAuth } from '../hooks/useAuth'

type AuthProviderProps = {
  children: React.ReactNode
}

export type AuthContextType = {
  sessionId: string
  user: User
  tokens: Tokens
  login: () => void
  logout: () => void
  handleAuthentication: () => void
  tokenExpired: boolean
}

export const AuthContext = createContext<AuthContextType>({
  sessionId: undefined,
  user: undefined,
  tokens: undefined,
  login: undefined,
  logout: undefined,
  handleAuthentication: undefined,
  tokenExpired: true,
})

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const { user, login, logout, handleAuthentication, tokens, sessionId } = useAuth()
  const _user = user
    ? { ...user, isAdmin: user['https://recipebible.net/roles'].includes('admin') }
    : undefined

  const expiresAt = pathOr(0, ['expiresAt'], tokens)
  const tokenExpired = Date.now() > expiresAt

  return (
    <AuthContext.Provider
      value={{ user: _user, tokens, login, logout, handleAuthentication, tokenExpired, sessionId }}
    >
      {children}
    </AuthContext.Provider>
  )
}
