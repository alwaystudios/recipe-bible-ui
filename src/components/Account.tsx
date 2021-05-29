import styled from '@emotion/styled'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { MenuItem } from './MenuItem'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  & div {
    display: inherit;
    align-items: inherit;
  }

  & p {
    color: black;
  }
`

const Photo = styled.img`
  margin: 0 0.5rem;
  height: 40px;
  width: 40px;
  border-radius: 50%;
`

export const Account: React.FunctionComponent = () => {
  const { user } = useContext(AuthContext)
  const history = useHistory()

  return (
    <Container>
      {user ? (
        <div onClick={() => history.push('/logout')}>
          <p>{user.name}</p>
          <Photo src={user.picture} />
        </div>
      ) : (
        <MenuItem label="Login" onClick={() => history.push('/account')} />
      )}
    </Container>
  )
}
