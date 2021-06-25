import { Button } from '@alwaystudios/as-ui-components'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../auth/AuthContext'
import { CopyAccessToken } from '../auth/CopyAccessToken'
import { useAnalytics } from '../hooks/useAnalytics'

export const MyAccountPage: React.FunctionComponent = () => {
  const { pageView } = useAnalytics()
  const { user } = useAuthContext()
  const history = useHistory()
  const roles = user['https://recipebible.net/roles']

  useEffect(() => {
    pageView()
  }, [])

  return (
    <>
      <Button onClick={() => history.push('/create')} text="New recipe" />
      <Button onClick={() => history.push('/manage/recipes')} text="Manage recipes" />
      <label>
        Name: {user.given_name} {user.family_name}
      </label>
      <label>Roles: {roles}</label>
      <CopyAccessToken />
    </>
  )
}
