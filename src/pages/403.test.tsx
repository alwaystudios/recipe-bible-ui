import { Http403 } from './403'
import React from 'react'
import { render, screen } from '@testing-library/react'

describe('403 page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the 403 page', () => {
    render(<Http403 />)
    expect(screen.getByText('403')).toBeInTheDocument()
    expect(screen.getByText('not authorized')).toBeInTheDocument()
  })
})
