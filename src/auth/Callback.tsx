import React from 'react'
import { useAuthContext } from './AuthContext'
import { useHistory } from 'react-router-dom'

export const Callback: React.FC = () => {
  const { handleAuthentication, user } = useAuthContext()
  const history = useHistory()

  if (!user) {
    handleAuthentication()
  }

  history.push('/recipes')

  return null
}
