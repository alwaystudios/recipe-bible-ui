/* eslint-disable */
import { User } from '@alwaystudios/recipe-bible-sdk'
import { v4 as uuidv4 } from 'uuid'

type SetAuth0Session = {
  setSessionId: (id: string) => void
  setUser: (user: User) => void
  setTokens: (tokens: Tokens) => void
  history: any
}

export const setAuth0Session =
  ({ setSessionId, setUser, setTokens, history }: SetAuth0Session, cb = () => {}) =>
  (err: any, authResult: any) => {
    if (err) {
      history.push('/')
      cb()
      return
    }

    if (authResult && authResult.accessToken && authResult.idToken) {
      const expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
      const { accessToken, idToken } = authResult

      setSessionId(uuidv4())
      setUser(authResult.idTokenPayload)
      setTokens({
        accessToken,
        idToken,
        expiresAt,
      } as Tokens)
      history.push('/account')
      cb()
    }
  }
