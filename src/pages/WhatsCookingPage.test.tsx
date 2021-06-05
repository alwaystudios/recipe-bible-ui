import { WhatsCookingPage } from './WhatsCookingPage'
import React from 'react'
import { render } from '@testing-library/react'
import * as useAnalyticsModule from '../hooks/useAnalytics'

const pageView = jest.fn()
const useAnalytics = jest
  .spyOn(useAnalyticsModule, 'useAnalytics')
  .mockReturnValue({ pageView } as any)

describe('Whats cooking page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the whats cooking page', () => {
    const { getByText } = render(<WhatsCookingPage />)
    expect(getByText('todo - whats cooking')).toBeInTheDocument()
    expect(useAnalytics).toHaveBeenCalledTimes(1)
    expect(pageView).toHaveBeenCalledTimes(1)
  })
})
