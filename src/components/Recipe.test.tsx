import React from 'react'
import { render } from '@testing-library/react'
import { Recipe } from './Recipe'
import { testRecipe } from '@alwaystudios/recipe-bible-sdk'

const recipe = testRecipe()

describe('recipe', () => {
  it('renders a recipe', () => {
    const { getByText } = render(<Recipe recipe={recipe} />)

    expect(getByText(recipe.title)).toBeInTheDocument()
    expect(getByText(recipe.story)).toBeInTheDocument()
  })
})
