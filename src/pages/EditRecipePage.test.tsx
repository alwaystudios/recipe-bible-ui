import { EditRecipePage } from './EditRecipePage'
import React from 'react'
import { render, screen } from '@testing-library/react'

describe('edit recipe page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders edit recipe page', () => {
    render(<EditRecipePage />)
    expect(screen.getByText('todo')).toBeInTheDocument()
  })
})
