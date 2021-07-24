import { UseIngredients } from '../src/hooks/useIngredients'

export const testUseIngredients = (overrides: Partial<UseIngredients> = {}): UseIngredients => ({
  getIngredients: jest.fn(),
  saveIngredient: jest.fn(),
  ingredients: [],
  loading: false,
  authError: false,
  ...overrides,
})
