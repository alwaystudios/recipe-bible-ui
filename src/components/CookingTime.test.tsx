import { CookingTime } from './CookingTime'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('CookingTime', () => {
  it('renders the cooking time', () => {
    render(<CookingTime cookingTime="20 mins" />)
    expect(screen.getByText('20 mins')).toBeInTheDocument()
  })
})
