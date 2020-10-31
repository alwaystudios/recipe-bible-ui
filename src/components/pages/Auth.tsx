import { useAuth0 } from '@auth0/auth0-react'
import React, { FunctionComponent } from 'react'
import { LoginButton } from '../LoginButton'
import { LogoutButton } from '../LogoutButton'

export const Auth: FunctionComponent = () => {
  const { isLoading, isAuthenticated } = useAuth0()
  return isLoading ? (
    <>Loading...</>
  ) : (
    <div className="rb-div">{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>
  )
}
