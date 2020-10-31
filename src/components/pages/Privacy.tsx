import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #7e7e7e;
`

const PDFObject = styled.object`
  width: 100%;
  height: 500px;
`

export const Privacy: FunctionComponent = () => (
  <Container>
    <PDFObject
      key="/Privacypolicy.pdf"
      type="application/pdf"
      data={`/Privacypolicy.pdf#toolbar=1`}
    ></PDFObject>
  </Container>
)
