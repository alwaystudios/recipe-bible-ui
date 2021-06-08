import React from 'react'
import { RecipeImage } from './RecipeImage'
import { render } from '@testing-library/react'

describe('RecipeImage', () => {
  it('renders a recipe image', () => {
    const { container } = render(<RecipeImage src="abc" size="small" />)
    expect(container.querySelector('img').getAttribute('src')).toEqual('abc')
  })
})
