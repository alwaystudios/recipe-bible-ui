import { PrivacyPage } from './PrivacyPage'
import React from 'react'
import { render } from '@testing-library/react'
import * as useAnalyticsModule from '../hooks/useAnalytics'
import { testUseAnalytics } from '../../test/testUseAnalytics'

const pageView = jest.fn()
const useAnalytics = jest
  .spyOn(useAnalyticsModule, 'useAnalytics')
  .mockReturnValue(testUseAnalytics({ pageView }))

describe('Privacy page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the privacy page', () => {
    const { container } = render(<PrivacyPage />)
    expect(container.querySelector('object').getAttribute('type')).toBe('application/pdf')
    expect(useAnalytics).toHaveBeenCalledTimes(1)
    expect(pageView).toHaveBeenCalledTimes(1)
  })
})
