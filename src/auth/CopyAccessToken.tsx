import { CopyToClipboard } from '@alwaystudios/as-ui-components'
import { pathOr } from 'ramda'
import React from 'react'
import { useAuthContext } from './AuthContext'

export const CopyAccessToken: React.FC = () => {
  const { tokens } = useAuthContext()

  const idToken = pathOr('', ['idToken'], tokens)

  return (
    <>
      Access Token: <CopyToClipboard text={idToken} />
    </>
  )
}
