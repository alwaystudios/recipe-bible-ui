import { RecipeInfo } from './RecipeInfo'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { lorem } from 'faker'

const categories = [lorem.words(2), lorem.words(2), lorem.words(2)]
const servings = 4
const cookingTime = '20 mins'

describe('RecipeInfo', () => {
  it('renders the recipe info', () => {
    render(<RecipeInfo servings={servings} cookingTime={cookingTime} categories={categories} />)
    categories.map((c) => expect(screen.getByText(c)).toBeInTheDocument())
    expect(screen.getByText(`Serves ${servings}`)).toBeInTheDocument()
    expect(screen.getByText('20 mins')).toBeInTheDocument()
  })
})
