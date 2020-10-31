import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  border: 1px solid black;
  padding: 1rem;
  margin: 1rem;
  min-height: 17rem;
  max-height: 17rem;
  min-width: 14rem;
  max-width: 14rem;
  border-radius: 5%;

  & div {
    display: flex;
    justify-content: center;
  }
`

const Title = styled.p`
  font-size: x-large;
  margin-bottom: 1rem;
  height: fit-content;
`

type ComponentProps = {
  title: string
}

export const Box: React.FunctionComponent<ComponentProps> = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    {children}
  </Container>
)
