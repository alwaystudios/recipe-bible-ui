import { AboutPage } from './AboutPage'
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as useAnalyticsModule from '../hooks/useAnalytics'
import { version } from '../../package.json'
import { MemoryRouter as Router } from 'react-router-dom'
import { testUseAnalytics } from '../../test/testUseAnalytics'

const pageView = jest.fn()
const useAnalytics = jest
  .spyOn(useAnalyticsModule, 'useAnalytics')
  .mockReturnValue(testUseAnalytics({ pageView }))

describe('About page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the about page', () => {
    render(
      <Router>
        <AboutPage />
      </Router>
    )
    expect(screen.getByText(`version: ${version}`)).toBeInTheDocument()
    expect(useAnalytics).toHaveBeenCalledTimes(1)
    expect(pageView).toHaveBeenCalledTimes(1)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe('/recipes')
  })
})
