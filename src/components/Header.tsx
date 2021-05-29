import styled from '@emotion/styled'
import React from 'react'
import { RB_GREEN } from './colors'
import Logo from '../images/logo.png'

const StyledHeading = styled.header`
  color: white;
  font-weight: bold;
  background-color: ${RB_GREEN};
  display: flex;
  flex-direction: row;
  align-items: center;
  position: sticky;
  opacity: 1;
  top: 0px;
  z-index: 99;
  user-select: none;
  min-height: 4rem;
  max-height: 4rem;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 10px 0px rgb(0 0 0 / 12%);

  & > div {
    display: inherit;
  }

  & > div:nth-of-type(1) {
    font-size: large;
    padding-right: 4rem;
    padding-left: 1rem;
  }

  & > div:nth-of-type(2) {
    flex-grow: 1;
  }

  & > img {
    max-height: 4rem;
  }
`

type Props = {
  mainText: string
  accountComponent?: React.ReactNode
}

export const Header: React.FC<Props> = ({ mainText, children, accountComponent }) => {
  return (
    <StyledHeading>
      <img src={Logo} />
      <div>{mainText}</div>
      <div>{children}</div>
      {accountComponent}
    </StyledHeading>
  )
}
