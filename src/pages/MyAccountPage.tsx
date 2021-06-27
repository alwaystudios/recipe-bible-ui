import React from 'react'
import { useAuthContext } from '../auth/AuthContext'
import { CopyAccessToken } from '../auth/CopyAccessToken'
import { WhatsCookingPage } from './WhatsCookingPage'

export const MyAccountPage: React.FunctionComponent = () => {
  const {
    user: { name, isAdmin },
  } = useAuthContext()

  return (
    <>
      <h1>Welcome to Recipe Bible, {name}</h1>
      {isAdmin ? <CopyAccessToken /> : <WhatsCookingPage />}
    </>
  )
}
