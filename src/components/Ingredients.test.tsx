import { Ingredients } from './Ingredients'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { lorem } from 'faker'
import { AWS_S3_BUCKET } from '../contstants'

const ingredients = [lorem.words(2), lorem.words(2), lorem.words(2)]

describe('Ingredients', () => {
  it('renders a list of ingredients', () => {
    const { getByText, container } = render(<Ingredients ingredients={ingredients} />)
    ingredients.map((name, index) => {
      expect(getByText(name)).toBeInTheDocument()
      expect(container.querySelectorAll('img')[index].getAttribute('src')).toBe(
        `${AWS_S3_BUCKET}/ingredients/${name}.jpg`
      )
    })
  })

  it('handles on delete events', () => {
    const onDelete = jest.fn()
    const { container } = render(<Ingredients ingredients={ingredients} onDelete={onDelete} />)
    ingredients.map((name, index) => {
      fireEvent.click(container.querySelectorAll('svg')[index])
      expect(onDelete).toHaveBeenCalledWith(name)
    })

    expect(onDelete).toHaveBeenCalledTimes(ingredients.length)
  })
})
