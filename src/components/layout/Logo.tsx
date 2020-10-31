import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Img = styled.img`
  height: 50px;
  margin: 0 0.5rem;
  border-radius: 5%;
  cursor: pointer;
`

type Props = {
  baseContent: string
}

export const Logo: FunctionComponent<Props> = ({ baseContent }) => {
  const history = useHistory()
  return <Img onClick={() => history.push('/about')} src={`${baseContent}/logo.png`} />
}
