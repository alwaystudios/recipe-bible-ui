import { Ingredient } from './Ingredient'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

const imgSrc = 'ingredient.jpg'
const label = 'my ingredient'

describe('Ingredient', () => {
  it('renders an ingredient', () => {
    const { container } = render(<Ingredient imgSrc={imgSrc} label={label} />)
    expect(screen.getByText(label)).toBeInTheDocument()
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
