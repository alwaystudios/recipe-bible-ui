import { useAuth0 } from '@auth0/auth0-react'
import React, { FunctionComponent } from 'react'
import { BeatLoader } from 'react-spinners'
import { LoginButton } from '../LoginButton'
import { LogoutButton } from '../LogoutButton'

export const Auth: FunctionComponent = () => {
  const { isLoading, isAuthenticated } = useAuth0()
  return (
    <div className="rb-div">
      {isLoading ? <BeatLoader /> : isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  )
}
