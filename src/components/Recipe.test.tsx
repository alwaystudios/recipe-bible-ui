import React from 'react'
import { render, screen } from '@testing-library/react'
import { Recipe } from './Recipe'
import { testRecipe } from '@alwaystudios/recipe-bible-sdk'

const recipe = testRecipe({ title: 'my new recipe' })

describe('recipe', () => {
  it('renders a recipe', () => {
    render(<Recipe recipe={recipe} />)

    expect(screen.getByText(recipe.title)).toBeInTheDocument()
    expect(screen.getByText(recipe.story)).toBeInTheDocument()
  })
})
