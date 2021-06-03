import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { useHistory } from 'react-router-dom'

export const Callback: React.FC = () => {
  const { handleAuthentication, user } = useContext(AuthContext)
  const history = useHistory()

  if (!user) {
    handleAuthentication()
  }

  history.push('/recipes')

  return null
}
