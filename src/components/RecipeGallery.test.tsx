import React from 'react'
import { render } from '@testing-library/react'
import { testRecipe } from '@alwaystudios/recipe-bible-sdk'
import { RecipeGallery } from './RecipeGallery'

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
    const { getByText } = render(<RecipeGallery recipes={recipes} options={options} />)

    recipes.map((r) => expect(getByText(r.title)).toBeInTheDocument())
  })
})
