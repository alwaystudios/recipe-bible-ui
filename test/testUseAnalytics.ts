import { UseAnalytics } from '../src/hooks/useAnalytics'

export const testUseAnalytics = (overrides: Partial<UseAnalytics> = {}): UseAnalytics => ({
  pageView: jest.fn(),
  pageEvent: jest.fn(),
  timing: jest.fn(),
  ...overrides,
})
