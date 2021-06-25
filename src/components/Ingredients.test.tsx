import { Ingredients } from './Ingredients'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { testIngredient } from '@alwaystudios/recipe-bible-sdk'
import { internet, lorem } from 'faker'

const ingredients = [
  testIngredient({ name: lorem.words(2), imgSrc: internet.url() }),
  testIngredient({ name: lorem.words(2), imgSrc: internet.url() }),
  testIngredient({ name: lorem.words(2), imgSrc: internet.url() }),
]

describe('Ingredients', () => {
  it('renders a list of ingredients', () => {
    const { container } = render(<Ingredients ingredients={ingredients} />)
    ingredients.map(({ name, imgSrc }, index) => {
      expect(screen.getByText(name)).toBeInTheDocument()
      expect(container.querySelectorAll('img')[index].getAttribute('src')).toBe(imgSrc)
    })
  })

  it('handles on delete events', () => {
    const onDelete = jest.fn()
    const { container } = render(<Ingredients ingredients={ingredients} onDelete={onDelete} />)
    ingredients.map(({ name }, index) => {
      fireEvent.click(container.querySelectorAll('svg')[index])
      expect(onDelete).toHaveBeenCalledWith(name)
    })

    expect(onDelete).toHaveBeenCalledTimes(ingredients.length)
  })
})
