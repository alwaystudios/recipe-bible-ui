import { UseAdverts } from '../src/hooks/useAdverts'

export const testUseAdverts = (overrides: Partial<UseAdverts> = {}): UseAdverts => ({
  getAdverts: jest.fn(),
  saveAdvert: jest.fn(),
  deleteAdvert: jest.fn(),
  adverts: [],
  loading: false,
  ...overrides,
})
