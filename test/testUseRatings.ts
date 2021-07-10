import { UseRatings } from '../src/hooks/useRatings'

export const testUseRatings = (overrides: Partial<UseRatings> = {}): UseRatings => ({
  setRating: jest.fn(),
  getAllRatings: jest.fn(),
  getRatings: jest.fn(),
  ratings: [],
  allRatings: [],
  rating: undefined,
  ...overrides,
})
