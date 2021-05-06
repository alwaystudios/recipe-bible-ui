import React, { createContext } from 'react'
import { useAuth } from '../hooks/useAuth'

type AuthProviderProps = {
	children: React.ReactNode
}

// todo: use proper types
export const AuthContext = createContext({
	user: undefined,
	tokens: undefined,
	login: undefined,
	logout: undefined,
	handleAuthentication: undefined,
})

export const AuthProvider: (_: AuthProviderProps) => JSX.Element = ({ children }: AuthProviderProps) => {
	const { user, login, logout, handleAuthentication, tokens } = useAuth()

	return (
		<AuthContext.Provider value={{ user, tokens, login, logout, handleAuthentication }}>
			{children}
		</AuthContext.Provider>
	)
}
