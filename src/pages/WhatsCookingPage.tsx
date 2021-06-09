import { CATEGORIES } from '@alwaystudios/recipe-bible-sdk'
import React, { useEffect } from 'react'
import { RecipeGallery } from '../components/RecipeGallery'
import { Spinner } from '../components/Spinner'
import { useAnalytics } from '../hooks/useAnalytics'
import { useRecipes } from '../hooks/useRecipes'

export const WhatsCookingPage: React.FunctionComponent = () => {
  const { pageView } = useAnalytics()
  const { getRecipes, recipes, loading } = useRecipes()
  const LATEST = 'Latest'
  const options = CATEGORIES.reduce(
    (acc, category) => ({
      ...acc,
      [category]: () => recipes.filter((r) => r.categories.includes(category)),
    }),
    { [LATEST]: () => recipes.filter((r) => r.metadata.focused) }
  )

  useEffect(() => {
    pageView()
    getRecipes()
  }, [])

  return (
    <Spinner isLoading={loading}>
      <RecipeGallery options={options} recipes={recipes} defaultOption={LATEST} />
    </Spinner>
  )
}
