import { RecipePage } from './RecipePage'
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as useAnalyticsModule from '../hooks/useAnalytics'
import { testRecipe } from '@alwaystudios/recipe-bible-sdk'
import * as useRecipesModule from '../hooks/useRecipes'
import * as recipeModule from '../components/Recipe'
import * as editRecipeModule from '../components/RecipeForm'
import * as BackToLinkModule from '../components/BackToLink'

const BackToLink = jest
  .spyOn(BackToLinkModule, 'BackToLink')
  .mockReturnValue(<p>back to link mock</p>)
const Recipe = jest.spyOn(recipeModule, 'Recipe').mockReturnValue(<p>view mock</p>)
const EditRecipe = jest.spyOn(editRecipeModule, 'RecipeForm').mockReturnValue(<p>edit mock</p>)

const recipe = testRecipe()
const getRecipe = jest.fn().mockResolvedValue(recipe)
jest
  .spyOn(useRecipesModule, 'useRecipes')
  .mockImplementation(() => ({ getRecipe, recipe, loading: false } as any))

const pageView = jest.fn()
const useAnalytics = jest
  .spyOn(useAnalyticsModule, 'useAnalytics')
  .mockReturnValue({ pageView } as any)

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    name: recipe.title,
  }),
}))

describe('recipe page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders in view mode by default', () => {
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

  it('renders in edit mode', () => {
    render(<RecipePage edit={true} />)

    expect(screen.getByText('edit mock')).toBeInTheDocument()
    expect(useAnalytics).toHaveBeenCalled()
    expect(pageView).not.toHaveBeenCalled()
    expect(getRecipe).toHaveBeenCalledTimes(1)
    expect(getRecipe).toHaveBeenCalledWith(recipe.title)

    expect(EditRecipe).toHaveBeenCalledWith({ recipe }, {})
  })
})
