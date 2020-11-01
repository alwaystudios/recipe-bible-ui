import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { ChefPhoto } from './ChefPhoto'
import { useAuthentication } from '../../hooks/useAuthentication'

const Container = styled.div`
  display: flex;
  margin-right: 0.5rem !important;
  flex-direction: row;
  align-items: center;
`

type ComponentProps = {
  author: string
  authorPhoto: string
}

export const ChefComponent: FunctionComponent<ComponentProps> = ({ author, authorPhoto }) => (
  <Container className="rb-chef">
    <b>{author}</b>
    {authorPhoto && <ChefPhoto src={authorPhoto} name={author} />}
  </Container>
)

export const Chef: React.FunctionComponent = () => {
  const {
    user: { name, picture },
  } = useAuthentication(false)

  return <ChefComponent author={name} authorPhoto={picture} />
}
