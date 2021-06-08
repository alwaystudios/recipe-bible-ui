import { Servings } from './Servings'
import { render } from '@testing-library/react'
import React from 'react'

describe('Servings', () => {
  it('renders the servings', () => {
    const { getByText } = render(<Servings servings={2} />)
    expect(getByText('Serves 2')).toBeInTheDocument()
  })
})
