import { AccountIcon } from '@alwaystudios/as-ui-components'
import styled from '@emotion/styled'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { SMALL_SCREEN } from '../breakpoints'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  & div {
    display: inherit;
    align-items: inherit;
    cursor: pointer;
    margin-right: 1rem;
  }

  & p {
    white-space: nowrap;
    font-weight: bold;
    color: black;
  }

  @media only screen and (max-width: ${SMALL_SCREEN}px) {
    & p {
      display: none;
    }
  }
`

const Photo = styled.img`
  margin-left: 0.5rem;
  height: 40px;
  width: 40px;
  border-radius: 50%;
`

const IconWrapper = styled.div`
  cursor: pointer;
`

export const Account: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext)
  const history = useHistory()

  return (
    <Container>
      {user ? (
        <div onClick={() => history.push('/account')}>
          <p>{user.name}</p>
          <Photo src={user.picture} />
        </div>
      ) : (
        <IconWrapper onClick={() => history.push('/account')}>
          <AccountIcon size="30px" />
        </IconWrapper>
      )}
    </Container>
  )
}
