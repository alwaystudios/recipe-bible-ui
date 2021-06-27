import styled from '@emotion/styled'
import React from 'react'
import { useAuthContext } from '../auth/AuthContext'
import { CopyAccessToken } from '../auth/CopyAccessToken'
import { WhatsCookingPage } from './WhatsCookingPage'

const Heading = styled.h1`
  margin-top: 0;
`

export const MyAccountPage: React.FunctionComponent = () => {
  const { user } = useAuthContext()
  const roles = user['https://recipebible.net/roles']

  return (
    <>
      <Heading>Welcome to Recipe Bible, {user.name}</Heading>
      {user.isAdmin ? <CopyAccessToken /> : <WhatsCookingPage />}
    </>
  )
}
