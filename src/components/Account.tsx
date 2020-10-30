import React, { FunctionComponent } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@alwaystudios/as-ui-components'

export const Profile: FunctionComponent = () => {
  // todo: make a type for user
  const { user, isAuthenticated, logout, loginWithRedirect, isLoading } = useAuth0()

  return isLoading ? (
    <>Loading...</>
  ) : isAuthenticated ? (
    <div className="rb-div">
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user['https://recipebible.net/roles']}</p>
      </div>
      <div>
        <Button text="log out" onClick={() => logout({ returnTo: window.location.href })} />
      </div>
    </div>
  ) : (
    <Button
      text="log in"
      onClick={() => loginWithRedirect({ redirectUri: window.location.href })}
    />
  )
}
