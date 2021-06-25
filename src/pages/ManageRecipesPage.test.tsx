import { ManageRecipesPage } from './ManageRecipesPage'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { testRecipe } from '@alwaystudios/recipe-bible-sdk'
import * as useRecipesModule from '../hooks/useRecipes'
import * as recipeGalleryModule from '../components/RecipeGallery'

const RecipeGallery = jest.spyOn(recipeGalleryModule, 'RecipeGallery').mockReturnValue(<>mock</>)

const recipes = [testRecipe(), testRecipe()]
const getRecipes = jest.fn().mockResolvedValue(recipes)
jest
  .spyOn(useRecipesModule, 'useRecipes')
  .mockImplementation(() => ({ getRecipes, recipes, loading: false } as any))

describe('manage recipes page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the manage recipes page', () => {
    render(<ManageRecipesPage />)

    expect(screen.getByText('mock')).toBeInTheDocument()
    expect(getRecipes).toHaveBeenCalledTimes(1)
    expect(getRecipes).toHaveBeenCalledWith({
      published: 'all',
      field: ['title', 'imgSrc', 'metadata'],
    })
    expect(RecipeGallery.mock.calls[0][0].defaultOption).toBe('Draft')
    expect(RecipeGallery.mock.calls[0][0].recipes).toBe(recipes)
    expect(RecipeGallery.mock.calls[0][0].options).toEqual({
      Draft: expect.anything(),
      Focused: expect.anything(),
      Published: expect.anything(),
    })
  })
})
