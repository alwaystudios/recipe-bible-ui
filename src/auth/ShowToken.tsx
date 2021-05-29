import { pathOr } from 'ramda'
import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'

export const ShowToken: React.FC = () => {
  const { tokens } = useContext(AuthContext)

  const idToken = pathOr('', ['idToken'], tokens)

  return <>{idToken}</>
}
