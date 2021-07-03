import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Recipe } from './Recipe'
import { testRecipe, testUser } from '@alwaystudios/recipe-bible-sdk'
import * as AuthContext from '../auth/AuthContext'

const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')

const push = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push,
  }),
}))

const recipe = testRecipe({ title: 'My new recipe' })

describe('recipe', () => {
  it('renders a recipe (no user logged in)', () => {
    render(<Recipe recipe={recipe} />)

    expect(screen.getByText(recipe.title)).toBeInTheDocument()
    expect(screen.getByText(recipe.story)).toBeInTheDocument()
  })

  it('renders edit button for admin user', () => {
    useAuthContext.mockReturnValueOnce({ user: testUser() } as any)
    render(<Recipe recipe={recipe} />)

    fireEvent.click(screen.getByText('edit'))
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/manage/recipes/my-new-recipe')
  })

  it('does not render an edit button for non admin user', () => {
    useAuthContext.mockReturnValueOnce({ user: testUser({ isAdmin: false }) } as any)
    render(<Recipe recipe={recipe} />)

    expect(screen.queryByText('edit')).not.toBeInTheDocument()
  })
})
