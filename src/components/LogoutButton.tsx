import React, { FunctionComponent } from 'react'
import { Button } from '@alwaystudios/as-ui-components'
import { useAuth0 } from '@auth0/auth0-react'

export const LogoutButton: FunctionComponent = () => {
  const { logout, isAuthenticated } = useAuth0()

  return (
    <Button
      disabled={!isAuthenticated}
      text="log out"
      onClick={() => logout({ returnTo: `${window.location.origin}/auth` })}
    />
  )
}
