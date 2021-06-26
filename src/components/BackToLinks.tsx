import styled from '@emotion/styled'
import React from 'react'
import { BackToLink } from './BackToLink'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

type Props = {
  links: Array<{
    text?: string
    to: string
  }>
}

export const BackToLinks: React.FC<Props> = ({ links }) => (
  <Container>
    {links.map(({ to, text }) => (
      <BackToLink key={to} to={to} text={text} />
    ))}
  </Container>
)
