import { Button } from '@alwaystudios/as-ui-components'
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { CopyAccessToken } from '../auth/CopyAccessToken'
import { useAnalytics } from '../hooks/useAnalytics'

export const MyAccountPage: React.FunctionComponent = () => {
  const { pageView } = useAnalytics()
  const { user } = useContext(AuthContext)
  const history = useHistory()
  const roles = user['https://recipebible.net/roles']

  useEffect(() => {
    pageView()
  }, [])

  return (
    <>
      <Button className="btn__logout" onClick={() => history.push('/logout')} text="Logout" />
      <Button onClick={() => history.push('/create')} text="New recipe" />
      <label>
        Name: {user.given_name} {user.family_name}
      </label>
      <label>Roles: {roles}</label>
      <CopyAccessToken />
    </>
  )
}
