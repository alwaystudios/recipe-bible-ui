import { AboutPage } from './AboutPage'
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as useAnalyticsModule from '../hooks/useAnalytics'
import { version } from '../../package.json'

const pageView = jest.fn()
const useAnalytics = jest
  .spyOn(useAnalyticsModule, 'useAnalytics')
  .mockReturnValue({ pageView } as any)

describe('About page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the about page', () => {
    render(<AboutPage />)
    expect(screen.getByText(`version: ${version}`)).toBeInTheDocument()
    expect(useAnalytics).toHaveBeenCalledTimes(1)
    expect(pageView).toHaveBeenCalledTimes(1)
  })
})
