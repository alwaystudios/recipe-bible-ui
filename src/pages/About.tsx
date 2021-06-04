import React, { useEffect } from 'react'
import { useAnalytics } from '../hooks/useAnalytics'

export const AboutPage: React.FunctionComponent = () => {
  const { pageView } = useAnalytics()

  useEffect(() => {
    pageView()
  }, [])

  return <>todo - about page</>
}
