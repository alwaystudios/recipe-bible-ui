import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { mediumScreen, smallScreen } from '../../config'

const Container = styled.header`
  background-color: #4cc912;
  min-height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: calc(7px + 2vmin);
  color: white;
  padding: 0 1rem 0 0;

  @media only screen and (max-width: ${mediumScreen}px) {
    font-size: 1rem;
  }

  @media only screen and (max-width: ${smallScreen}px) {
    font-size: 0.75rem;

    > .user-photo {
      display: none;
    }
  }
`

export const Header: FunctionComponent = ({ children }) => {
  return <Container>{children}</Container>
}
