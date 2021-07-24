import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import auth0 from 'auth0-js'
import { User } from '@alwaystudios/recipe-bible-sdk'
import { AUTH0_DOMAIN, AUTH0_CLIENTID, AUTH0_CALLBACK, BASE_URL } from '../constants'
import { setAuth0Session } from '../auth/auth0'

type UseAuth = {
  sessionId: string
  tokens: Tokens
  user: User
  login: () => void
  logout: () => void
  handleAuthentication: () => void
}

export const useAuth = (): UseAuth => {
  const auth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENTID,
    redirectUri: AUTH0_CALLBACK,
    responseType: 'token id_token',
    scope: 'openid profile email',
  })

  const [sessionId, setSessionId] = useState<string>()
  const [user, setUser] = useState<User>()
  const [tokens, setTokens] = useState<Tokens>()
  const history = useHistory()

  return {
    sessionId,
    tokens,
    user,
    login: () => auth.authorize(),
    logout: () => {
      setSessionId(undefined)
      setUser(undefined)
      setTokens(undefined)
      auth.logout({
        returnTo: BASE_URL,
      })
    },
    handleAuthentication: () =>
      auth.parseHash(setAuth0Session({ setSessionId, setTokens, setUser, history })),
  }
}
