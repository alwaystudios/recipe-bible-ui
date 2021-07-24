import { ManageRecipePage } from './ManageRecipePage'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { testRecipe } from '@alwaystudios/recipe-bible-sdk'
import * as useRecipesModule from '../hooks/useRecipes'
import * as editRecipeModule from '../components/RecipeForm'
import * as BackToLinkModule from '../components/BackToLink'
import { testUseRecipes } from '../../test/testUseRecipes'

const BackToLink = jest
  .spyOn(BackToLinkModule, 'BackToLink')
  .mockReturnValue(<p>back to link mock</p>)
const EditRecipe = jest
  .spyOn(editRecipeModule, 'RecipeForm')
  .mockReturnValue(<p>recipe form mock</p>)

const recipe = testRecipe()
const getRecipe = jest.fn().mockResolvedValue(recipe)
const useRecipes = jest.spyOn(useRecipesModule, 'useRecipes')

const push = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    name: recipe.title,
  }),
  useHistory: () => ({
    push,
  }),
}))

describe('manage recipe page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the recipe form', () => {
    const deleteRecipe = jest.fn()
    const updateRecipe = jest.fn()
    useRecipes.mockReturnValue(
      testUseRecipes({ deleteRecipe, updateRecipe, getRecipe, recipe, loading: false })
    )
    render(<ManageRecipePage />)

    expect(screen.getByText('recipe form mock')).toBeInTheDocument()
    expect(screen.getByText('back to link mock')).toBeInTheDocument()
    expect(getRecipe).toHaveBeenCalledTimes(1)
    expect(getRecipe).toHaveBeenCalledWith(recipe.title)

    expect(EditRecipe).toHaveBeenCalledTimes(1)
    expect(EditRecipe).toHaveBeenCalledWith({ deleteRecipe, updateRecipe, recipe }, {})
  })

  it('redirects to /account on auth error', () => {
    useRecipes.mockReturnValue(
      testUseRecipes({ getRecipe, recipe, loading: false, authError: true })
    )
    render(<ManageRecipePage />)

    expect(screen.getByText('recipe form mock')).toBeInTheDocument()
    expect(screen.getByText('back to link mock')).toBeInTheDocument()
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith(`/account`)
  })

  it('renders 404 when no recipe', () => {
    useRecipes.mockReturnValue(testUseRecipes({ getRecipe, recipe: undefined, loading: false }))
    render(<ManageRecipePage />)

    expect(screen.queryByText('view mock')).not.toBeInTheDocument()
    expect(screen.getByText('back to link mock')).toBeInTheDocument()
    expect(getRecipe).toHaveBeenCalledTimes(1)
    expect(getRecipe).toHaveBeenCalledWith(recipe.title)

    expect(BackToLink).toHaveBeenCalledTimes(1)
    expect(BackToLink).toHaveBeenCalledWith({ text: 'recipes', to: '/recipes' }, {})

    expect(screen.getByText('404')).toBeInTheDocument()
  })
})
