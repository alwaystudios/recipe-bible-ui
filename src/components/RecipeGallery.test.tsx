import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { testRecipe } from '@alwaystudios/recipe-bible-sdk'
import { RecipeGallery } from './RecipeGallery'

const onFilter = jest.fn()
const push = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push,
  }),
  useLocation: () => ({
    pathname: 'some pathname',
  }),
}))

const recipes = [testRecipe({ title: 'Recipe1' }), testRecipe({ title: 'Recipe2' })]
const options = { option1: () => recipes }

describe('recipe gallery', () => {
  it('renders a recipe gallery', () => {
    render(<RecipeGallery recipes={recipes} options={options} onFilter={onFilter} />)

    recipes.map((r) => expect(screen.getByText(r.title)).toBeInTheDocument())
  })

  it('filters recipes based on the search filter', () => {
    onFilter.mockReturnValueOnce([])
    render(<RecipeGallery recipes={recipes} options={options} onFilter={onFilter} />)

    const searchInput = screen.getByRole('recipe-gallery-search-input')
    fireEvent.change(searchInput, { target: { value: 'search' } })

    expect(onFilter).toHaveBeenCalledTimes(1)
    expect(onFilter).toHaveBeenCalledWith('search')
  })
})
