import styled from '@emotion/styled'
import React from 'react'
import PdfFile from '../public/Privacypolicy.pdf'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #7e7e7e;
`

const PDFObject = styled.object`
  width: 100%;
  height: 500px;
`

export const PrivacyPage: React.FC = () => (
  <Container>
    <PDFObject key="/assets/Privacypolicy.pdf" type="application/pdf" data={PdfFile}></PDFObject>
  </Container>
)
