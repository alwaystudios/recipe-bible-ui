import { CopyToClipboard } from '@alwaystudios/as-ui-components'
import { pathOr } from 'ramda'
import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'

export const CopyAccessToken: React.FC = () => {
  const { tokens } = useContext(AuthContext)

  const idToken = pathOr('', ['idToken'], tokens)

  return (
    <>
      Access Token: <CopyToClipboard text={idToken} />
    </>
  )
}
