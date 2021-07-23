import { testRecipe } from '@alwaystudios/recipe-bible-sdk'
import { UseRecipes } from '../src/hooks/useRecipes'

export const testUseRecipes = (overrides: Partial<UseRecipes> = {}): UseRecipes => ({
  updateRecipe: jest.fn(),
  getRecipes: jest.fn(),
  getRecipe: jest.fn(),
  createRecipe: jest.fn(),
  deleteRecipe: jest.fn(),
  clearErrors: jest.fn(),
  recipes: [testRecipe()],
  recipe: testRecipe(),
  loading: false,
  error: false,
  authError: false,
  ...overrides,
})
