import styled from '@emotion/styled'
import React from 'react'
import { useAuthContext } from '../auth/AuthContext'
import { CopyAccessToken } from '../auth/CopyAccessToken'
import { WhatsCookingPage } from './WhatsCookingPage'

const Heading = styled.h1`
  margin-top: 0;
`

export const MyAccountPage: React.FunctionComponent = () => {
  const {
    user: { name, isAdmin },
  } = useAuthContext()

  return (
    <>
      <Heading>Welcome to Recipe Bible, {name}</Heading>
      {isAdmin ? <CopyAccessToken /> : <WhatsCookingPage />}
    </>
  )
}
