import styled from '@emotion/styled'
import React from 'react'
import { Advert } from './Advert'

const Container = styled.div`
  display: flex;
  margin: 2rem 2rem 0 2rem;
  flex-wrap: nowrap;
  justify-content: space-evenly;
`

type Props = {
  ads: string[]
}

export const Adverts: React.FC<Props> = ({ ads }) => (
  <Container>
    {ads.map((ad, index) => (
      <Advert key={index} src={ad} />
    ))}
  </Container>
)
