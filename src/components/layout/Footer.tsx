import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  line-height: 1.6;

  a {
    margin-right: 1rem;
  }
`

const Hr = styled.hr`
  margin: 1rem;
  border: 1px solid #4cc912;
  width: 80%;
`

export const Footer: FunctionComponent = () => {
  return (
    <Container>
      <Hr />
      <div>
        <Link to="/about">About</Link>
        <Link to="/terms">Terms and conditions</Link>
        <Link to="/privacy">Privacy policy</Link>
        <Link to="/chefs">Chefs</Link>
      </div>
    </Container>
  )
}
