import styled from '@emotion/styled'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { RB_GREEN } from './colors'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  line-height: 1.6;
  border-top: 4px solid ${RB_GREEN};
  margin: 0 5rem;
  padding: 1rem 0 0 0;

  a {
    margin: 0 0.5rem;
  }
`

export const Footer: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext)

  return (
    <Container>
      <Link to="/about">About</Link>
      <Link to="/terms">Terms and conditions</Link>
      <Link to="/privacy">Privacy policy</Link>
      {user && <Link to="/logout">Logout</Link>}
    </Container>
  )
}
