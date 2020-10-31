import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Container = styled.header`
  display: flex;
  flex-direction: row;
`

export const Nav: FunctionComponent = ({ children }) => {
  return <Container>{children}</Container>
}
