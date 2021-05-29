import styled from '@emotion/styled'
import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { ShowToken } from '../auth/ShowToken'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const MyCookbook: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext)

  return (
    <Container>
      <label>
        Name: {user.given_name} {user.family_name}
      </label>
      <label>Roles: {user['https://recipebible.net/roles']}</label>
      <ShowToken />
    </Container>
  )
}
