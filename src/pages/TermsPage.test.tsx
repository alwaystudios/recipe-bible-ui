import { TermsPage } from './TermsPage'
import React from 'react'
import { render } from '@testing-library/react'
import * as useAnalyticsModule from '../hooks/useAnalytics'

const pageView = jest.fn()
const useAnalytics = jest
  .spyOn(useAnalyticsModule, 'useAnalytics')
  .mockReturnValue({ pageView } as any)

describe('Terms and conditions page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the terms and conditions page', () => {
    const { container } = render(<TermsPage />)
    expect(container.querySelector('object').getAttribute('type')).toBe('application/pdf')
    expect(useAnalytics).toHaveBeenCalledTimes(1)
    expect(pageView).toHaveBeenCalledTimes(1)
  })
})
