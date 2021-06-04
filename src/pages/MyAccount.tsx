import { Button } from '@alwaystudios/as-ui-components'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { CopyAccessToken } from '../auth/CopyAccessToken'
import {
  AUTH0_DOMAIN,
  AUTH0_CLIENTID,
  AUTH0_CALLBACK,
  BASE_URL,
  API_BASE_URL,
  AWS_S3_BUCKET,
  GA_TAG,
  IS_OFFLINE,
} from '../contstants'
import { useAnalytics } from '../hooks/useAnalytics'

export const MyAccountPage: React.FunctionComponent = () => {
  const { pageView, pageEvent } = useAnalytics()
  const { user } = useContext(AuthContext)
  const history = useHistory()
  const [showEnvVars, setShowEnvVars] = useState(false)
  const roles = user['https://recipebible.net/roles']

  useEffect(() => {
    pageView()
    // todo: remove after test
    pageEvent({
      category: 'test',
      action: 'visit the account page',
    })
  }, [])

  return (
    <>
      <label>
        Name: {user.given_name} {user.family_name}
      </label>
      <label>Roles: {roles}</label>
      <CopyAccessToken />
      {user.isAdmin && <Button onClick={() => setShowEnvVars(!showEnvVars)} text="Env" />}
      {showEnvVars && user.isAdmin && (
        <>
          <p>AUTH0_DOMAIN: {AUTH0_DOMAIN}</p>
          <p>AUTH0_CLIENTID: {AUTH0_CLIENTID}</p>
          <p>AUTH0_CALLBACK: {AUTH0_CALLBACK}</p>
          <p>BASE_URL: {BASE_URL}</p>
          <p>API_BASE_URL: {API_BASE_URL}</p>
          <p>AWS_S3_BUCKET: {AWS_S3_BUCKET}</p>
          <p>GA_TAG: {GA_TAG}</p>
          <p>IS_OFFLINE: {JSON.stringify(IS_OFFLINE)}</p>
        </>
      )}
      <Button onClick={() => history.push('/logout')} text="Logout" />
    </>
  )
}
