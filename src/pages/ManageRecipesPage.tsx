import { path } from 'ramda'
import React, { useEffect, useState } from 'react'
import { RecipeGallery } from '../components/RecipeGallery'
import { Spinner } from '../components/Spinner'
import { useRecipes } from '../hooks/useRecipes'

const STATUS = ['Published', 'Focused']

export const ManageRecipesPage: React.FunctionComponent = () => {
  const [didMount, setDidMount] = useState(false)
  const { getRecipes, recipes, loading } = useRecipes()
  const ALL = 'All'
  const options = STATUS.reduce(
    (acc, status) => ({
      ...acc,
      [status]: () => recipes.filter((r) => path([status.toLocaleLowerCase()], r)),
    }),
    { [ALL]: () => recipes }
  )

  useEffect(() => {
    getRecipes({ published: 'all', field: ['title', 'imgSrc', 'metadata'] })
    setDidMount(true)
    return () => setDidMount(false)
  }, [])

  if (!didMount) {
    return null
  }

  return (
    <Spinner isLoading={loading}>
      <RecipeGallery options={options} recipes={recipes} defaultOption={ALL} />
    </Spinner>
  )
}
