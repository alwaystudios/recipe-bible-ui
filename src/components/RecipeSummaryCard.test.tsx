import { RecipeSummaryCard } from './RecipeSummaryCard'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { lorem } from 'faker'

const title = lorem.word()
const imgSrc = lorem.word()
const onClick = jest.fn()

describe('RecipeSummaryCard', () => {
  it('renders a recipe summary card', () => {
    const { container } = render(
      <RecipeSummaryCard title={title} imgSrc={imgSrc} onClick={onClick} />
    )
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(container.querySelector('img').getAttribute('src')).toBe(imgSrc)
  })

  it('handles on click events', () => {
    render(<RecipeSummaryCard title={title} imgSrc={imgSrc} onClick={onClick} />)
    fireEvent.click(screen.getByText(title))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
