import { ContentSwitcher } from '@alwaystudios/as-ui-components'
import { kebabify, Recipe, recipeTitleTransformer } from '@alwaystudios/recipe-bible-sdk'
import React, { FunctionComponent, useState } from 'react'
import { useHistory } from 'react-router'
import { AWS_S3_BUCKET } from '../contstants'
import { RecipeSummaryCards } from './RecipeSummaryCards'

type Props = {
  recipes: Partial<Recipe[]>
  options: Record<string, (recipes: Partial<Recipe[]>) => Partial<Recipe[]>>
  defaultOption?: string
}

export const RecipeGallery: FunctionComponent<Props> = ({ recipes, defaultOption, options }) => {
  const history = useHistory()

  const applyOption = (option?: string): RecipeList => {
    const _recipes = option && options ? options[option](recipes) : recipes

    return _recipes.map(({ title, imgSrc }) => {
      const _title = kebabify(title)
      return {
        title: recipeTitleTransformer(title),
        imgSrc: `${AWS_S3_BUCKET}/recipes/${_title}/${imgSrc}`,
        onClick: () => history.push(`/recipes/${_title}`),
      }
    })
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
