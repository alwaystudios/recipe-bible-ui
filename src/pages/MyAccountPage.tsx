import styled from '@emotion/styled'
import React from 'react'
import { useAuthContext } from '../auth/AuthContext'
import { CopyAccessToken } from '../auth/CopyAccessToken'
import { WhatsCookingPage } from './WhatsCookingPage'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`

export const MyAccountPage: React.FunctionComponent = () => {
  const {
    user: { name, isAdmin },
  } = useAuthContext()

  return (
    <Container>
      <h1>Welcome to Recipe Bible, {name}</h1>
      {isAdmin ? <CopyAccessToken /> : <WhatsCookingPage />}
    </Container>
  )
}
