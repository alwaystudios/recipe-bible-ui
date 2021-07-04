import React, { useEffect } from 'react'
import { useAnalytics } from '../hooks/useAnalytics'
import { version } from '../../package.json'
import { BackToLink } from '../components/BackToLink'
import styled from '@emotion/styled'
import {
  API_BASE_URL,
  AUTH0_CALLBACK,
  AUTH0_CLIENTID,
  AUTH0_DOMAIN,
  AWS_S3_BUCKET,
  BASE_URL,
  GA_TAG,
} from '../contstants'

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
      <p>auth domain: {AUTH0_DOMAIN}</p>
      <p>auth client id: {AUTH0_CLIENTID}</p>
      <p>auth callback: {AUTH0_CALLBACK}</p>
      <p>base url: {BASE_URL}</p>
      <p>api base url: {API_BASE_URL}</p>
      <p>s3 bucket: {AWS_S3_BUCKET}</p>
      <p>ga tag: {GA_TAG}</p>
    </>
  )
}
