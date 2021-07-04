import React, { useEffect, useState } from 'react'
import { RecipeGallery } from '../components/RecipeGallery'
import { Spinner } from '../components/Spinner'
import { useRecipes } from '../hooks/useRecipes'

const DRAFT = 'Draft'
const FOCUSED = 'Focused'
const PUBLISHED = 'Published'

export const ManageRecipesPage: React.FunctionComponent = () => {
  const [didMount, setDidMount] = useState(false)
  const { getRecipes, recipes, loading } = useRecipes()

  const options = {
    [DRAFT]: () => recipes.filter((r) => !r.metadata.published),
    [FOCUSED]: () => recipes.filter((r) => r.metadata.focused),
    [PUBLISHED]: () => recipes.filter((r) => r.metadata.published),
  }

  const onFilter = (search: string) =>
    recipes.filter((r) => r.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

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
      <RecipeGallery
        options={options}
        recipes={recipes}
        defaultOption={DRAFT}
        mode="edit"
        onFilter={onFilter}
      />
    </Spinner>
  )
}
