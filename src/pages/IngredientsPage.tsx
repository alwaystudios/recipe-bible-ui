import { Ingredient, toIngredientLabel } from '@alwaystudios/recipe-bible-sdk'
import React, { useEffect, useState } from 'react'
import { Ingredients } from '../components/Ingredients'
import { useAnalytics } from '../hooks/useAnalytics'
import { useIngredients } from '../hooks/useIngredients'
import { getIngredientImgSrc } from '../domain/recipeTransformer'
import { TextInput } from '@alwaystudios/as-ui-components'

export const IngredientsPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [didMount, setDidMount] = useState(false)
  const { pageView } = useAnalytics()
  const { ingredients, getIngredients } = useIngredients()

  const asIngredients = (ingredients: string[]): Ingredient[] =>
    ingredients.map((name) => ({
      name: toIngredientLabel({ name }),
      imgSrc: getIngredientImgSrc(name),
    }))

  const [visibleIngredients, setVisibleIngredients] = useState<Ingredient[]>(
    asIngredients(ingredients)
  )

  useEffect(() => {
    if (!search) {
      setVisibleIngredients(asIngredients(ingredients))
      return
    }

    setVisibleIngredients(
      asIngredients(
        ingredients.filter((i) => i.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      )
    )
  }, [search, ingredients])

  useEffect(() => {
    pageView()
    getIngredients()
    setDidMount(true)
    return () => setDidMount(false)
  }, [])

  if (!didMount) {
    return null
  }

  return (
    <>
      <h1>Ingredients</h1>
      <TextInput
        isSearch={true}
        placeholder="search ingredients"
        autoFocus={true}
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <Ingredients ingredients={visibleIngredients} />
    </>
  )
}
