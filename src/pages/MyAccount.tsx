import { Button } from '@alwaystudios/as-ui-components'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { ShowToken } from '../auth/ShowToken'

export const MyAccountPage: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext)
  const history = useHistory()

  return (
    <>
      <label>
        Name: {user.given_name} {user.family_name}
      </label>
      <label>Roles: {user['https://recipebible.net/roles']}</label>
      <ShowToken />
      <Button onClick={() => history.push('/logout')} text="Logout" />
    </>
  )
}
