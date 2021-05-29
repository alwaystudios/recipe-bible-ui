import { User } from '@alwaystudios/recipe-bible-sdk'
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
}>({
  user: undefined,
  tokens: undefined,
  login: undefined,
  logout: undefined,
  handleAuthentication: undefined,
})

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const { user, login, logout, handleAuthentication, tokens } = useAuth()

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout, handleAuthentication }}>
      {children}
    </AuthContext.Provider>
  )
}
