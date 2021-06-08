import { Ingredient } from './Ingredient'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

const imgSrc = 'ingredient.jpg'
const label = 'my ingredient'

describe('Ingredient', () => {
  it('renders an ingredient', () => {
    const { getByText, container } = render(<Ingredient imgSrc={imgSrc} label={label} />)
    expect(getByText(label)).toBeInTheDocument()
    expect(container.querySelector('img').getAttribute('src')).toBe(imgSrc)
  })

  it('handles on delete event', () => {
    const onDelete = jest.fn()
    const { container } = render(<Ingredient imgSrc={imgSrc} label={label} onDelete={onDelete} />)
    fireEvent.click(container.querySelector('svg'))
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith(label)
  })
})
