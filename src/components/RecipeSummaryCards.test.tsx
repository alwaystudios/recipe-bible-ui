import { RecipeSummaryCards } from './RecipeSummaryCards'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { lorem } from 'faker'

const recipeList = [...Array(5)].map(() => ({
  title: lorem.words(3),
  imgSrc: lorem.word(),
  onClick: jest.fn(),
}))

describe('RecipeSummaryCards', () => {
  it('renders a list of recipe summary cards', () => {
    const { getByText, container } = render(<RecipeSummaryCards recipeList={recipeList} />)
    recipeList.map(({ title, imgSrc }, index) => {
      expect(getByText(title)).toBeInTheDocument()
      expect(container.querySelectorAll('img')[index].getAttribute('src')).toBe(imgSrc)
    })
  })

  it('handles on click events', () => {
    const { getByText } = render(<RecipeSummaryCards recipeList={recipeList} />)
    recipeList.map(({ title, onClick }) => {
      fireEvent.click(getByText(title))
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
