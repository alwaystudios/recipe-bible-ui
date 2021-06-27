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

type Props = {
  statusCode: number
  status: string
}

export const StatusPage: React.FC<Props> = ({ statusCode, status }) => (
  <Container>
    <b>{statusCode}</b> {status}
  </Container>
)
