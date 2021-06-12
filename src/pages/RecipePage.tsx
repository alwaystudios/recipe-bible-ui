import { recipeTitleTransformer } from '@alwaystudios/recipe-bible-sdk'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useAnalytics } from '../hooks/useAnalytics'

export const RecipePage: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const { pageView } = useAnalytics()

  useEffect(() => {
    pageView()
  }, [])

  return <>{recipeTitleTransformer(name)}</>
}
