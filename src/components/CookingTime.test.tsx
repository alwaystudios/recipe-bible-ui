import { CookingTime } from './CookingTime'
import { render } from '@testing-library/react'
import React from 'react'

describe('CookingTime', () => {
  it('renders the cooking time', () => {
    const { getByText } = render(<CookingTime cookingTime="20 mins" />)
    expect(getByText('20 mins')).toBeInTheDocument()
  })
})
