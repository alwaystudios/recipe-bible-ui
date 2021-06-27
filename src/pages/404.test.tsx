import { Http404 } from './404'
import React from 'react'
import { render, screen } from '@testing-library/react'

describe('404 page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the 404 page', () => {
    render(<Http404 />)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('not found')).toBeInTheDocument()
  })
})
