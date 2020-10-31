import React, { FunctionComponent } from 'react'
import { LogoutButton } from '../LogoutButton'
import { useAuthentication } from '../../hooks/useAuthentication'
import { BeatLoader } from 'react-spinners'
import { ChefPhoto } from '../domain/ChefPhoto'

export const Profile: FunctionComponent = () => {
  const { user, isLoading } = useAuthentication()

  return (
    <div className="rb-div">
      {isLoading && <BeatLoader />}
      <div>
        <ChefPhoto src={user.picture} name={user.name} size="regular" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  )
}
