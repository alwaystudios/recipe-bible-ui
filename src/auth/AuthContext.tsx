import { User } from '@alwaystudios/recipe-bible-sdk'
import { pathOr } from 'ramda'
import React, { createContext } from 'react'
import { useAuth } from '../hooks/useAuth'

type AuthProviderProps = {
  children: React.ReactNode
}

export type AuthContextType = {
  user: User
  tokens: Tokens
  login: () => void
  logout: () => void
  handleAuthentication: () => void
  tokenExpired: boolean
}

export const AuthContext = createContext<AuthContextType>({
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
