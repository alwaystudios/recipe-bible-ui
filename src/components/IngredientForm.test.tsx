import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { IngredientForm } from './IngredientForm'
import { lorem } from 'faker'
import { toIngredientRecord } from '@alwaystudios/recipe-bible-sdk'

const saveIngredient = jest.fn()
const ingredient = lorem.words(3)
const ingredients = [lorem.words(2), lorem.words(2), ingredient].map(toIngredientRecord)
const totalIngredients = ingredients.length

describe('ingredients form', () => {
  it('prevents save where no quantity', () => {
    render(
      <IngredientForm
        saveIngredient={saveIngredient}
        totalIngredients={totalIngredients}
        ingredients={ingredients}
      />
    )

    const labelInput = screen.getByRole('ingredient-form-input')
    fireEvent.change(labelInput, { target: { value: ingredient } })
    expect(screen.getAllByDisplayValue(ingredient)[0]).toBeInTheDocument()

    const saveButton = screen.getByText('save')
    expect(saveButton).toBeInTheDocument()

    fireEvent.click(saveButton)

    expect(saveIngredient).not.toHaveBeenCalled()
  })

  it('saves a new ingredient', () => {
    render(
      <IngredientForm
        saveIngredient={saveIngredient}
        totalIngredients={totalIngredients}
        ingredients={ingredients}
      />
    )

    const quantityInput = screen.getByRole('quantity-form-input')
    fireEvent.change(quantityInput, { target: { value: 22 } })
    expect(screen.getByDisplayValue(22)).toBeInTheDocument()

    const labelInput = screen.getByRole('ingredient-form-input')
    fireEvent.change(labelInput, { target: { value: ingredient } })
    expect(screen.getAllByDisplayValue(ingredient)[0]).toBeInTheDocument()

    const saveButton = screen.getByText('save')
    expect(saveButton).toBeInTheDocument()

    fireEvent.click(saveButton)

    expect(saveIngredient).toHaveBeenCalledTimes(1)
    expect(saveIngredient).toHaveBeenCalledWith({
      measure: 'qty',
      name: toIngredientRecord(ingredient),
      quantity: '22',
    })
  })

  it('allows user to upload a non existing ingredient', () => {
    render(
      <IngredientForm
        saveIngredient={saveIngredient}
        totalIngredients={totalIngredients}
        ingredients={ingredients}
      />
    )

    expect(screen.getByText('upload')).toBeInTheDocument()
  })
})
