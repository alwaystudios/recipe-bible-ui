import { ContentSwitcher, TextInput } from '@alwaystudios/as-ui-components'
import { Recipe } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { SMALL_SCREEN } from '../breakpoints'
import { fromRecipesApi } from '../domain/recipeTransformer'
import { RecipeSummaryCards } from './RecipeSummaryCards'

const Container = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: ${SMALL_SCREEN}px) {
    flex-direction: column;
  }
`

type Props = {
  recipes: Partial<Recipe[]>
  options: Record<string, (recipes: Partial<Recipe[]>) => Partial<Recipe[]>>
  mode?: 'view' | 'edit'
  defaultOption?: string
  onFilter: (search: string) => Partial<Recipe[]>
}

export const RecipeGallery: FunctionComponent<Props> = ({
  recipes,
  defaultOption,
  options,
  mode = 'view',
  onFilter,
}) => {
  const history = useHistory()

  const applyOption = (option?: string): RecipeList => {
    const _recipes = option && options ? options[option](recipes) : recipes

    return fromRecipesApi(_recipes, history.push, mode)
  }

  const [search, setSearch] = useState('')
  const [currentOption, setCurrentOption] = useState<string>(defaultOption)
  const [visibleRecipes, setVisibleRecipes] = useState<RecipeList>(applyOption(defaultOption))

  const handleContentSwitch = async (option: string) => {
    setCurrentOption(option)
    setVisibleRecipes(applyOption(option))
  }

  useEffect(() => {
    if (!search) {
      setCurrentOption(defaultOption)
      setVisibleRecipes(applyOption(defaultOption))
      return
    }

    setCurrentOption('')
    setVisibleRecipes(fromRecipesApi(onFilter(search), history.push, mode))
  }, [search])

  return (
    <>
      <Container>
        <ContentSwitcher
          selectedOption={currentOption}
          options={Object.keys(options)}
          onChange={handleContentSwitch}
        />
        <TextInput
          role="recipe-gallery-search-input"
          autoFocus={true}
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
      </Container>
      <RecipeSummaryCards recipeList={visibleRecipes} />
    </>
  )
}
