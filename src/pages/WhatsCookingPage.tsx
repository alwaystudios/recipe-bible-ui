import React, { useEffect } from 'react'
import { useAnalytics } from '../hooks/useAnalytics'

export const WhatsCookingPage: React.FunctionComponent = () => {
  const { pageView } = useAnalytics()

  useEffect(() => {
    pageView()
  }, [])

  return <>todo - whats cooking</>
}
