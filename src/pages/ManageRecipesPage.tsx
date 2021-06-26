import { path } from 'ramda'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RecipeGallery } from '../components/RecipeGallery'
import { Spinner } from '../components/Spinner'
import { useRecipes } from '../hooks/useRecipes'

const STATUS = ['Focused', 'Published']

export const ManageRecipesPage: React.FunctionComponent = () => {
  const [didMount, setDidMount] = useState(false)
  const { getRecipes, recipes, loading } = useRecipes()
  const Draft = 'Draft'
  const options = STATUS.reduce(
    (acc, status) => ({
      ...acc,
      [status]: () => recipes.filter((r) => path([status.toLocaleLowerCase()], r)),
    }),
    { [Draft]: () => recipes.filter((r) => !r.metadata.published) }
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
    <>
      <Link to="/manage/recipes/create">create new recipe</Link>
      <Spinner isLoading={loading}>
        <RecipeGallery options={options} recipes={recipes} defaultOption={Draft} mode="edit" />
      </Spinner>
    </>
  )
}
