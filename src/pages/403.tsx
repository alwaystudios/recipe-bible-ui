import styled from '@emotion/styled'
import React from 'react'

const Container = styled.div`
  & > b {
    font-size: xxx-large;
    margin-right: 15px;
  }

  display: flex;
  align-items: baseline;
  justify-content: center;
  width: 80%;
  padding: 10rem;
`

export const Http403: React.FC = () => (
  <Container>
    <b>403</b> not authorized
  </Container>
)
