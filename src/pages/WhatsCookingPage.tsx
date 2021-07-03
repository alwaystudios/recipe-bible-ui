import { CATEGORIES } from '@alwaystudios/recipe-bible-sdk'
import React, { useEffect, useState } from 'react'
import { RecipeGallery } from '../components/RecipeGallery'
import { Spinner } from '../components/Spinner'
import { useAnalytics } from '../hooks/useAnalytics'
import { useRecipes } from '../hooks/useRecipes'

export const WhatsCookingPage: React.FunctionComponent = () => {
  const [didMount, setDidMount] = useState(false)
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

  const onFilter = (search: string) =>
    recipes.filter((r) => r.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  useEffect(() => {
    pageView()
    getRecipes({ field: ['title', 'imgSrc', 'categories', 'metadata'] })
    setDidMount(true)
    return () => setDidMount(false)
  }, [])

  if (!didMount) {
    return null
  }

  return (
    <Spinner isLoading={loading}>
      <RecipeGallery
        options={options}
        recipes={recipes}
        defaultOption={LATEST}
        onFilter={onFilter}
      />
    </Spinner>
  )
}
