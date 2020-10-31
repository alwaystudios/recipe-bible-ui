import { useAsync } from '@alwaystudios/as-ui-components'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

type User = {
  name: string
  email: string
  roles: string[]
  picture: string
}

export const useAuthentication = (
  redirectOnFailure = true,
): {
  accessToken: string
  isLoading: boolean
  user: User
} => {
  const [accessToken, setAccessToken] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { getAccessTokenSilently, user } = useAuth0()
  const history = useHistory()

  const { callback } = useAsync(() =>
    getAccessTokenSilently({
      audience: `https://dev-27x9tbv3.eu.auth0.com/api/v2/`,
      scope: 'read:current_user',
    })
      .then((accessToken) => {
        setAccessToken(accessToken)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
        if (redirectOnFailure) {
          history.push('/auth')
        }
      }),
  )

  useEffect(() => {
    if (!accessToken) {
      callback()
    }
  }, [])

  return {
    accessToken,
    user: { ...user, roles: user ? user['https://recipebible.net/roles'] : [] },
    isLoading,
  }
}
