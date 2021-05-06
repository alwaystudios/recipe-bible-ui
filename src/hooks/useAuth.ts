import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import auth0 from 'auth0-js'

export const useAuth = () => {
	const auth = new auth0.WebAuth({
		domain: process.env.AUTH0_DOMAIN,
		clientID: process.env.AUTH0_CLIENTID,
		redirectUri: process.env.AUTH0_CALLBACK,
		responseType: 'token id_token',
		scope: 'openid profile email',
	})

	// todo: use proper types
	const [user, setUser] = useState()
	const [tokens, setTokens] = useState()
	const history = useHistory()

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const setSession = (cb = () => {}) => (err: any, authResult: any) => {
		if (err) {
			history.push('/')
			cb()
			return
		}

		if (authResult && authResult.accessToken && authResult.idToken) {
			const expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
			const { accessToken, idToken } = authResult
			setUser(authResult.idTokenPayload)
			setTokens({
				accessToken,
				idToken,
				expiresAt,
			} as any)
			history.push('/account')
			cb()
		}
	}

	return {
		tokens,
		user,
		login: () => auth.authorize(),
		logout: () => {
			setUser(undefined)
			setTokens(undefined)
			auth.logout({
				returnTo: process.env.BASE_URL,
			})
		},
		handleAuthentication: () => auth.parseHash(setSession()),
	}
}
