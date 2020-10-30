import { useAsync } from '@alwaystudios/as-ui-components'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export const useAccessToken = (): {
  accessToken: string
  isLoading: boolean
} => {
  const [accessToken, setAccessToken] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { getAccessTokenSilently } = useAuth0()
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
        history.push('/account')
      }),
  )

  useEffect(() => {
    callback()
  }, [])

  return { accessToken, isLoading }
}
