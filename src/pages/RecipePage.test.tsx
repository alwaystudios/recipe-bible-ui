import { RecipePage } from './RecipePage'
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as useAnalyticsModule from '../hooks/useAnalytics'
import { testRecipe } from '@alwaystudios/recipe-bible-sdk'
import * as useRecipesModule from '../hooks/useRecipes'
import * as recipeModule from '../components/Recipe'
import * as editRecipeModule from '../components/RecipeForm'
import * as BackToLinkModule from '../components/BackToLink'
import { testUseAnalytics } from '../../test/testUseAnalytics'
import { testUseRecipes } from '../../test/testUseRecipes'

const BackToLink = jest
  .spyOn(BackToLinkModule, 'BackToLink')
  .mockReturnValue(<p>back to link mock</p>)
const Recipe = jest.spyOn(recipeModule, 'Recipe').mockReturnValue(<p>view mock</p>)
const EditRecipe = jest.spyOn(editRecipeModule, 'RecipeForm').mockReturnValue(<p>edit mock</p>)

const recipe = testRecipe()
const getRecipe = jest.fn().mockResolvedValue(recipe)
const useRecipes = jest.spyOn(useRecipesModule, 'useRecipes')

const pageView = jest.fn()
const useAnalytics = jest
  .spyOn(useAnalyticsModule, 'useAnalytics')
  .mockReturnValue(testUseAnalytics({ pageView }))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    name: recipe.title,
  }),
}))

describe('recipe page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders in view mode by default', () => {
    useRecipes.mockReturnValue(testUseRecipes({ getRecipe, recipe, loading: false }))
    render(<RecipePage />)

    expect(screen.getByText('view mock')).toBeInTheDocument()
    expect(screen.getByText('back to link mock')).toBeInTheDocument()
    expect(useAnalytics).toHaveBeenCalled()
    expect(pageView).toHaveBeenCalledTimes(1)
    expect(getRecipe).toHaveBeenCalledTimes(1)
    expect(getRecipe).toHaveBeenCalledWith(recipe.title)

    expect(BackToLink).toHaveBeenCalledTimes(1)
    expect(BackToLink).toHaveBeenCalledWith({ text: 'recipes', to: '/recipes' }, {})

    expect(Recipe).toHaveBeenCalledTimes(1)
    expect(Recipe).toHaveBeenCalledWith({ recipe }, {})
  })

  it('renders 404 when no recipe', () => {
    useRecipes.mockReturnValue(testUseRecipes({ getRecipe, recipe: undefined, loading: false }))
    render(<RecipePage />)

    expect(screen.queryByText('view mock')).not.toBeInTheDocument()
    expect(screen.getByText('back to link mock')).toBeInTheDocument()
    expect(useAnalytics).toHaveBeenCalled()
    expect(pageView).toHaveBeenCalledTimes(1)
    expect(getRecipe).toHaveBeenCalledTimes(1)
    expect(getRecipe).toHaveBeenCalledWith(recipe.title)

    expect(BackToLink).toHaveBeenCalledTimes(1)
    expect(BackToLink).toHaveBeenCalledWith({ text: 'recipes', to: '/recipes' }, {})

    expect(Recipe).not.toHaveBeenCalledTimes(1)

    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders in edit mode', () => {
    const deleteRecipe = jest.fn()
    const updateRecipe = jest.fn()
    useRecipes.mockReturnValue(
      testUseRecipes({ deleteRecipe, updateRecipe, getRecipe, recipe, loading: false })
    )
    render(<RecipePage edit={true} />)

    expect(screen.getByText('edit mock')).toBeInTheDocument()
    expect(useAnalytics).toHaveBeenCalled()
    expect(pageView).not.toHaveBeenCalled()
    expect(getRecipe).toHaveBeenCalledTimes(1)
    expect(getRecipe).toHaveBeenCalledWith(recipe.title)

    expect(EditRecipe).toHaveBeenCalledTimes(1)
    expect(EditRecipe).toHaveBeenCalledWith({ deleteRecipe, updateRecipe, recipe }, {})
  })
})
