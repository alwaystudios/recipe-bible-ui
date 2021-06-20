import React from 'react'
import { useAuthContext } from './AuthContext'

export const Logout: React.FC = () => {
  const { logout } = useAuthContext()
  logout()
  return null
}
