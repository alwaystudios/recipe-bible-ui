import { WhatsCookingPage } from './WhatsCookingPage'
import React from 'react'
import { render } from '@testing-library/react'
import * as useAnalyticsModule from '../hooks/useAnalytics'
import { testRecipe } from '@alwaystudios/recipe-bible-sdk'
import * as useRecipesModule from '../hooks/useRecipes'
import * as recipeGalleryModule from '../components/RecipeGallery'

const RecipeGallery = jest.spyOn(recipeGalleryModule, 'RecipeGallery').mockReturnValue(<>mock</>)

const recipes = [testRecipe(), testRecipe()]
const getRecipes = jest.fn().mockResolvedValue(recipes)
jest
  .spyOn(useRecipesModule, 'useRecipes')
  .mockImplementation(() => ({ getRecipes, recipes, loading: false } as any))

const pageView = jest.fn()
const useAnalytics = jest
  .spyOn(useAnalyticsModule, 'useAnalytics')
  .mockReturnValue({ pageView } as any)

describe('Whats cooking page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the whats cooking page', () => {
    const { getByText } = render(<WhatsCookingPage />)

    expect(getByText('mock')).toBeInTheDocument()
    expect(useAnalytics).toHaveBeenCalled()
    expect(pageView).toHaveBeenCalledTimes(1)
    expect(getRecipes).toHaveBeenCalledTimes(1)
    expect(getRecipes).toHaveBeenCalledWith({
      field: ['title', 'imgSrc', 'categories', 'metadata'],
    })
    expect(RecipeGallery.mock.calls[0][0].defaultOption).toBe('Latest')
    expect(RecipeGallery.mock.calls[0][0].recipes).toBe(recipes)
    expect(RecipeGallery.mock.calls[0][0].options).toEqual({
      Chicken: expect.anything(),
      Desserts: expect.anything(),
      Fish: expect.anything(),
      Latest: expect.anything(),
      Meat: expect.anything(),
      Other: expect.anything(),
      Pasta: expect.anything(),
      Salads: expect.anything(),
      Snacks: expect.anything(),
      Soups: expect.anything(),
      Vegan: expect.anything(),
      Vegetarian: expect.anything(),
    })
  })
})
