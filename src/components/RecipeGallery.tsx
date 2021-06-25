import { ContentSwitcher } from '@alwaystudios/as-ui-components'
import { Recipe } from '@alwaystudios/recipe-bible-sdk'
import React, { FunctionComponent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { fromRecipesApi } from '../domain/recipeTransformer'
import { RecipeSummaryCards } from './RecipeSummaryCards'

type Props = {
  recipes: Partial<Recipe[]>
  options: Record<string, (recipes: Partial<Recipe[]>) => Partial<Recipe[]>>
  mode?: 'view' | 'edit'
  defaultOption?: string
}

export const RecipeGallery: FunctionComponent<Props> = ({
  recipes,
  defaultOption,
  options,
  mode = 'view',
}) => {
  const history = useHistory()

  const applyOption = (option?: string): RecipeList => {
    const _recipes = option && options ? options[option](recipes) : recipes

    return fromRecipesApi(_recipes, history.push, mode)
  }

  const [currentOption, setCurrentOption] = useState<string>(defaultOption)
  const [visibleRecipes, setVisibleRecipes] = useState<RecipeList>(applyOption(defaultOption))

  const handleContentSwitch = async (option: string) => {
    setCurrentOption(option)
    setVisibleRecipes(applyOption(option))
  }

  return (
    <>
      <ContentSwitcher
        selectedOption={currentOption}
        options={Object.keys(options)}
        onChange={handleContentSwitch}
      />
      <RecipeSummaryCards recipeList={visibleRecipes} />
    </>
  )
}
