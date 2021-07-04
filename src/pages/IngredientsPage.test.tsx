import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { IngredientsPage } from './IngredientsPage'
import * as useIngredientsModule from '../hooks/useIngredients'
import { lorem } from 'faker'
import { tail } from 'ramda'

const ingredients = [...Array(10)].map(() => lorem.words(2))
const getIngredients = jest.fn()
jest
  .spyOn(useIngredientsModule, 'useIngredients')
  .mockReturnValue({ getIngredients, ingredients, loading: false } as any)

describe('ingredients page', () => {
  it('renders with ingredients', () => {
    render(<IngredientsPage />)
    expect(screen.getByText('Ingredients')).toBeInTheDocument()
    expect(getIngredients).toHaveBeenCalledTimes(1)
    ingredients.map((i) => expect(screen.getByText(i)).toBeInTheDocument())
  })

  it('filters ingredients', () => {
    render(<IngredientsPage />)
    fireEvent.change(screen.getByPlaceholderText('search ingredients'), {
      target: { value: ingredients[0] },
    })
    expect(screen.getByText(ingredients[0])).toBeInTheDocument()
    tail(ingredients).map((i) => expect(screen.queryByText(i)).not.toBeInTheDocument())
  })
})
