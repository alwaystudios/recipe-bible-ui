import React, { useEffect } from 'react'
import { useAnalytics } from '../hooks/useAnalytics'
import { version } from '../../package.json'
import { BackToLink } from '../components/BackToLink'
import styled from '@emotion/styled'

const Container = styled.div`
  padding: 1rem;
`

export const AboutPage: React.FunctionComponent = () => {
  const { pageView } = useAnalytics()

  useEffect(() => {
    pageView()
  }, [])

  return (
    <>
      <BackToLink to="/recipes" text="recipes" />
      <Container>version: {version}</Container>
    </>
  )
}
