import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useAnalytics } from '../hooks/useAnalytics'
import PdfFile from '../public/terms.pdf'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #7e7e7e;
`

const PDFObject = styled.object`
  width: 100%;
  height: 500px;
`

export const TermsPage: React.FC = () => {
  const { pageView } = useAnalytics()

  useEffect(() => {
    pageView()
  }, [])

  return (
    <Container>
      <PDFObject key="/assets/terms.pdf" type="application/pdf" data={PdfFile}></PDFObject>
    </Container>
  )
}
