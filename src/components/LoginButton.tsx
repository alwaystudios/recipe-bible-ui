import React, { FunctionComponent } from 'react'
import { Button } from '@alwaystudios/as-ui-components'
import { useAuth0 } from '@auth0/auth0-react'

export const LoginButton: FunctionComponent = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  return (
    <Button
      disabled={isAuthenticated}
      text="log in"
      onClick={() => loginWithRedirect({ redirectUri: `${window.location.origin}/account` })}
    />
  )
}
