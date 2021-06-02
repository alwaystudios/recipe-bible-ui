import { Button } from '@alwaystudios/as-ui-components'
import React, { useContext, useState } from 'react'
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
} from '../contstants'
import { useAnalytics } from '../hooks/useAnalytics'

export const MyAccountPage: React.FunctionComponent = () => {
  const { pageView } = useAnalytics()
  const { user } = useContext(AuthContext)
  const history = useHistory()
  const [showEnvVars, setShowEnvVars] = useState(false)
  const roles = user['https://recipebible.net/roles']
  const isAdmin = roles.includes('admin')

  pageView()

  return (
    <>
      <label>
        Name: {user.given_name} {user.family_name}
      </label>
      <label>Roles: {roles}</label>
      <CopyAccessToken />
      {isAdmin && <Button onClick={() => setShowEnvVars(!showEnvVars)} text="Env" />}
      {showEnvVars && isAdmin && (
        <>
          <p>AUTH0_DOMAIN: {AUTH0_DOMAIN}</p>
          <p>AUTH0_CLIENTID: {AUTH0_CLIENTID}</p>
          <p>AUTH0_CALLBACK: {AUTH0_CALLBACK}</p>
          <p>BASE_URL: {BASE_URL}</p>
          <p>API_BASE_URL: {API_BASE_URL}</p>
          <p>AWS_S3_BUCKET: {AWS_S3_BUCKET}</p>
          <p>GA_TAG: {GA_TAG}</p>
        </>
      )}
      <Button onClick={() => history.push('/logout')} text="Logout" />
    </>
  )
}
