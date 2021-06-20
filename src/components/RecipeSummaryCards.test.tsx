import { RecipeSummaryCards } from './RecipeSummaryCards'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { lorem } from 'faker'

const recipeList = [...Array(5)].map(() => ({
  title: lorem.words(3),
  imgSrc: lorem.word(),
  onClick: jest.fn(),
}))

describe('RecipeSummaryCards', () => {
  it('renders a list of recipe summary cards', () => {
    const { container } = render(<RecipeSummaryCards recipeList={recipeList} />)
    recipeList.map(({ title, imgSrc }, index) => {
      expect(screen.getByText(title)).toBeInTheDocument()
      expect(container.querySelectorAll('img')[index].getAttribute('src')).toBe(imgSrc)
    })
  })

  it('handles on click events', () => {
    render(<RecipeSummaryCards recipeList={recipeList} />)
    recipeList.map(({ title, onClick }) => {
      fireEvent.click(screen.getByText(title))
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
