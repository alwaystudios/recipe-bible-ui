import { Pill } from '@alwaystudios/as-ui-components'
import styled from '@emotion/styled'
import React from 'react'
import { RB_GREEN, RB_WHITE } from '../colors'

const Container = styled.div`
  display: flex;
  flex-direction: row;

  & > div {
    margin: 0 0.25rem 0 0;
  }
`

export const Categories: React.FC<{ categories: string[] }> = ({ categories }) => (
  <Container>
    {categories.map((c) => (
      <Pill key={c} backgroundColor={RB_GREEN} color={RB_WHITE} label={c} />
    ))}
  </Container>
)
