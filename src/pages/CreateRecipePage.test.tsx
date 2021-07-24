import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { CreateRecipePage } from './CreateRecipePage'
import * as useRecipesModule from '../hooks/useRecipes'
import { testUseRecipes } from '../../test/testUseRecipes'

const createRecipe = jest.fn()
const title = 'my-new-recipe'

const push = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push,
  }),
}))

describe('create a new recipe', () => {
  beforeEach(jest.clearAllMocks)

  it('creates a new recipe', () => {
    jest
      .spyOn(useRecipesModule, 'useRecipes')
      .mockReturnValue(testUseRecipes({ createRecipe, recipe: { title } }))
    createRecipe.mockResolvedValueOnce(undefined)
    render(<CreateRecipePage />)
    expect(screen.getByText('Create a new recipe')).toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText('Fast and furious fish and chips'), {
      target: { value: 'My new recipe' },
    })
    fireEvent.click(screen.getByText('create'))

    expect(createRecipe).toHaveBeenCalledTimes(1)
    expect(createRecipe).toHaveBeenCalledWith('My new recipe')
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith(`/manage/recipes/${title}`)
  })

  it('prevents creation if recipe already exists', () => {
    jest
      .spyOn(useRecipesModule, 'useRecipes')
      .mockReturnValue(testUseRecipes({ createRecipe, error: true, recipe: undefined }))
    createRecipe.mockResolvedValueOnce(undefined)
    render(<CreateRecipePage />)
    expect(screen.getByText('Create a new recipe')).toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText('Fast and furious fish and chips'), {
      target: { value: 'My new recipe' },
    })
    fireEvent.click(screen.getByText('create'))

    expect(screen.getByText('Recipe already exists')).toBeInTheDocument()

    expect(createRecipe).toHaveBeenCalledTimes(1)
    expect(createRecipe).toHaveBeenCalledWith('My new recipe')
    expect(push).not.toHaveBeenCalled()
  })

  it('redirects to /account on auth error', () => {
    jest
      .spyOn(useRecipesModule, 'useRecipes')
      .mockReturnValue(testUseRecipes({ createRecipe, authError: true, recipe: undefined }))
    createRecipe.mockResolvedValueOnce(undefined)
    render(<CreateRecipePage />)
    expect(screen.getByText('Create a new recipe')).toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText('Fast and furious fish and chips'), {
      target: { value: 'My new recipe' },
    })
    fireEvent.click(screen.getByText('create'))

    expect(createRecipe).toHaveBeenCalledTimes(1)
    expect(createRecipe).toHaveBeenCalledWith('My new recipe')
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith(`/account`)
  })
})
