import React, { FunctionComponent, useState } from 'react'
import { RecipeSummaryCards } from '../domain/RecipeSummaryCards'
import { RecipeList } from '@alwaystudios/recipe-bible-sdk'
import { CategorySwitcher } from './CategorySwitcher'
import { kebabify } from '@alwaystudios/as-utils'

type Props = {
  recipes: RecipeList
  options: Record<string, (recipes: RecipeList) => RecipeList>
  defaultOption: string
}

export const RecipeGallery: FunctionComponent<Props> = ({ recipes, defaultOption, options }) => {
  const [currentOption, setCurrentOption] = useState<string>(defaultOption)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [visibleRecipes, setVisibleRecipes] = useState<RecipeList>(options[defaultOption](recipes))

  const handleContentSwitch = async (option: string) => {
    setSearchTerm('')
    setCurrentOption(option)
    setVisibleRecipes(options[option](recipes))
  }

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    setCurrentOption('')
    event.preventDefault()
    const term = event.currentTarget.value
    setSearchTerm(term)
    const kebabifiedTerm = kebabify(term)
    const filterBytitle = recipes.filter((r) => r.title.toLowerCase().includes(kebabifiedTerm))
    const filterByCategory = recipes.filter((r) =>
      r.categories.map((c) => c.toLowerCase()).includes(kebabifiedTerm),
    )
    const filterByIngredient = recipes.filter((r) =>
      r.ingredients.map((i) => i.toLowerCase()).find((i) => i.includes(kebabifiedTerm)),
    )
    const results = new Set([...filterBytitle, ...filterByCategory, ...filterByIngredient])
    setVisibleRecipes(Array.from(results))
  }

  return (
    <>
      <CategorySwitcher
        currentOption={currentOption}
        options={Object.keys(options)}
        setCurrentOption={handleContentSwitch}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
      <RecipeSummaryCards recipes={visibleRecipes} />
    </>
  )
}
