import React from 'react'
import {
  AUTH0_DOMAIN,
  AUTH0_CLIENTID,
  AUTH0_CALLBACK,
  BASE_URL,
  API_BASE_URL,
  AWS_S3_BUCKET,
  GA_TAG,
} from '../contstants'

export const AboutPage: React.FunctionComponent = () => (
  <div>
    <p>AUTH0_DOMAIN: {AUTH0_DOMAIN}</p>
    <p>AUTH0_CLIENTID: {AUTH0_CLIENTID}</p>
    <p>AUTH0_CALLBACK: {AUTH0_CALLBACK}</p>
    <p>BASE_URL: {BASE_URL}</p>
    <p>API_BASE_URL: {API_BASE_URL}</p>
    <p>AWS_S3_BUCKET: {AWS_S3_BUCKET}</p>
    <p>GA_TAG: {GA_TAG}</p>
  </div>
)
