import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { CreateRecipePage } from './CreateRecipePage'
import * as useRecipesModule from '../hooks/useRecipes'
import * as AuthContext from '../auth/AuthContext'

const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')
const tokens = { idToken: '1234' }

const createRecipe = jest.fn()
jest.spyOn(useRecipesModule, 'useRecipes').mockImplementation(() => ({ createRecipe } as any))

const push = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push,
  }),
}))

describe('create a new recipe', () => {
  it('creates a new recipe', async () => {
    useAuthContext.mockReturnValue({ tokens } as any)
    createRecipe.mockResolvedValueOnce(undefined)
    render(<CreateRecipePage />)
    expect(screen.getByText('Create a new recipe')).toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText('Fast and furious fish and chips'), {
      target: { value: 'My new recipe' },
    })
    fireEvent.click(screen.getByText('create'))

    await waitFor(() => {
      expect(push).toHaveBeenCalledTimes(1)
      expect(push).toHaveBeenCalledWith(`manage/recipes/my-new-recipe`)
    })

    expect(createRecipe).toHaveBeenCalledTimes(1)
    expect(createRecipe).toHaveBeenCalledWith('1234', 'My new recipe')
  })
})
