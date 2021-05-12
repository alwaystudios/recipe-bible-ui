import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'

export const Callback: React.FC = () => {
  const { handleAuthentication } = useContext(AuthContext)
  handleAuthentication()

  return null
}
