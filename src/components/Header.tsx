import styled from '@emotion/styled'
import React from 'react'
import { RB_GREEN } from './colors'
import Logo from '../images/logo.png'
import { Account } from './Account'
import { useHistory } from 'react-router-dom'

const StyledHeading = styled.header`
  color: white;
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
    font-size: x-large;
    font-weight: bold;
    padding-right: 4rem;
    padding-left: 1rem;
    cursor: pointer;
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
}

export const Header: React.FC<Props> = ({ mainText, children }) => {
  const history = useHistory()

  return (
    <StyledHeading>
      <img
        style={{ cursor: 'pointer' }}
        alt="logo"
        src={Logo}
        onClick={() => history.push('/about')}
      />
      <div onClick={() => history.push('/')}>{mainText}</div>
      <div>{children}</div>
      <Account />
    </StyledHeading>
  )
}
