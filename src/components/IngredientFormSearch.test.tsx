import { IngredientFormSearch } from './IngredientFormSearch'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { lorem } from 'faker'

const value = lorem.word()
const setValue = jest.fn()
const ingredients = ['aa', 'ab', 'app', 'apple', 'banana']

describe('Ingredients form search', () => {
  it('renders search form without showing search results', () => {
    render(
      <IngredientFormSearch
        disabled={false}
        value={value}
        setValue={setValue}
        ingredients={ingredients}
      />
    )
    expect(screen.getByPlaceholderText('add an ingredient')).toBeInTheDocument()
    expect(screen.queryByText(ingredients[0])).not.toBeInTheDocument()
  })

  it('handles text input', () => {
    render(
      <IngredientFormSearch
        disabled={false}
        value={value}
        setValue={setValue}
        ingredients={ingredients}
      />
    )

    const input = screen.getByRole('ingredient-form-input')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(setValue).toHaveBeenCalledTimes(1)
    expect(setValue).toHaveBeenCalledWith('test')
  })
})
