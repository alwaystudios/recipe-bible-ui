import { WhatsCookingPage } from './WhatsCookingPage'
import React from 'react'
import { render, waitFor } from '@testing-library/react'
import * as useAnalyticsModule from '../hooks/useAnalytics'
import { CATEGORIES, testRecipe } from '@alwaystudios/recipe-bible-sdk'
import * as useRecipesModule from '../hooks/useRecipes'

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

  it('renders the whats cooking page', async () => {
    const { getByText } = render(<WhatsCookingPage />)

    const categories = ['Latest', ...CATEGORIES]
    await waitFor(() => categories.map((c) => expect(getByText(c)).toBeInTheDocument()))

    expect(useAnalytics).toHaveBeenCalled()
    expect(pageView).toHaveBeenCalledTimes(1)
  })
})
