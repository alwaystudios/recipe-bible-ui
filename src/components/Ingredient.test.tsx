import { Ingredient } from './Ingredient'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { testIngredient } from '@alwaystudios/recipe-bible-sdk'

const imgSrc = 'ingredient.jpg'
const name = 'my ingredient'
const ingredient = testIngredient({ imgSrc, name, quantity: '1' })

describe('Ingredient', () => {
  it('renders an ingredient', () => {
    const { container } = render(<Ingredient ingredient={ingredient} />)
    expect(screen.getByText('1 my ingredient')).toBeInTheDocument()
    expect(container.querySelector('img').getAttribute('src')).toBe(imgSrc)
  })

  it('handles on delete event', () => {
    const onDelete = jest.fn()
    const { container } = render(<Ingredient ingredient={ingredient} onDelete={onDelete} />)
    fireEvent.click(container.querySelector('svg'))
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith(name)
  })
})
