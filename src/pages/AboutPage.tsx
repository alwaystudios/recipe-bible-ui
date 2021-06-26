import React, { useEffect } from 'react'
import { useAnalytics } from '../hooks/useAnalytics'
import { version } from '../../package.json'

export const AboutPage: React.FunctionComponent = () => {
  const { pageView } = useAnalytics()

  useEffect(() => {
    pageView()
  }, [])

  return <>version: {version}</>
}
