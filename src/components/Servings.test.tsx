import { Servings } from './Servings'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Servings', () => {
  it('renders the servings', () => {
    render(<Servings servings={2} />)
    expect(screen.getByText('Serves 2')).toBeInTheDocument()
  })
})
