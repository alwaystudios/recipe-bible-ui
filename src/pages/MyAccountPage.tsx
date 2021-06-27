import React, { useEffect } from 'react'
import { useAuthContext } from '../auth/AuthContext'
import { CopyAccessToken } from '../auth/CopyAccessToken'
import { useAnalytics } from '../hooks/useAnalytics'

export const MyAccountPage: React.FunctionComponent = () => {
  const { pageView } = useAnalytics()
  const { user } = useAuthContext()
  const roles = user['https://recipebible.net/roles']

  useEffect(() => {
    pageView()
  }, [])

  return (
    <>
      <label>
        Name: {user.given_name} {user.family_name}
      </label>
      <label>Roles: {roles}</label>
      <CopyAccessToken />
    </>
  )
}
