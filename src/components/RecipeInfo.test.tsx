import { RecipeInfo } from './RecipeInfo'
import { render } from '@testing-library/react'
import React from 'react'
import { lorem } from 'faker'

const categories = [lorem.words(2), lorem.words(2), lorem.words(2)]
const servings = 4
const cookingTime = '20 mins'

describe('RecipeInfo', () => {
  it('renders the recipe info', () => {
    const { getByText } = render(
      <RecipeInfo servings={servings} cookingTime={cookingTime} categories={categories} />
    )
    categories.map((c) => expect(getByText(c)).toBeInTheDocument())
    expect(getByText(`Serves ${servings}`)).toBeInTheDocument()
    expect(getByText('20 mins')).toBeInTheDocument()
  })
})
