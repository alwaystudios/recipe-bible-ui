import React, { FunctionComponent } from 'react'
import { LogoutButton } from '../LogoutButton'
import { useAuthentication } from '../../hooks/useAuthentication'

export const Profile: FunctionComponent = () => {
  const { user, isLoading } = useAuthentication()

  return isLoading ? (
    <>Loading...</>
  ) : (
    <div className="rb-div">
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.roles}</p>
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  )
}
