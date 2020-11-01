import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Img = styled.img`
  height: 50px;
  margin: 0 0.5rem;
  border-radius: 5%;
  cursor: pointer;
`

export const Logo: FunctionComponent = () => {
  const history = useHistory()
  return <Img onClick={() => history.push('/about')} src={`${window.location.origin}/logo.png`} />
}
