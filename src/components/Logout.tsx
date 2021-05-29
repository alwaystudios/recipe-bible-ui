import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'

export const Logout: React.FC = () => {
  const { logout } = useContext(AuthContext)
  logout()
  return null
}
