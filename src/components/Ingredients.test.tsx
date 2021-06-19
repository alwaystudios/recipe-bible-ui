import { Ingredients } from './Ingredients'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { testIngredient } from '@alwaystudios/recipe-bible-sdk'
import { internet } from 'faker'

const ingredients = [
  testIngredient({ imgSrc: internet.url() }),
  testIngredient({ imgSrc: internet.url() }),
  testIngredient({ imgSrc: internet.url() }),
]

describe('Ingredients', () => {
  it('renders a list of ingredients', () => {
    const { getByText, container } = render(<Ingredients ingredients={ingredients} />)
    ingredients.map(({ name, imgSrc }, index) => {
      expect(getByText(name)).toBeInTheDocument()
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
