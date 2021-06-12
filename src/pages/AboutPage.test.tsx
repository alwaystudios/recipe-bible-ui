import { AboutPage } from './AboutPage'
import React from 'react'
import { render } from '@testing-library/react'
import * as useAnalyticsModule from '../hooks/useAnalytics'

const pageView = jest.fn()
const useAnalytics = jest
  .spyOn(useAnalyticsModule, 'useAnalytics')
  .mockReturnValue({ pageView } as any)

describe('About page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the about page', () => {
    const { getByText } = render(<AboutPage />)
    expect(getByText('about page')).toBeInTheDocument()
    expect(useAnalytics).toHaveBeenCalledTimes(1)
    expect(pageView).toHaveBeenCalledTimes(1)
  })
})
