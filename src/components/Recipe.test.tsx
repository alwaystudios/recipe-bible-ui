import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Recipe } from './Recipe'
import { testRecipe, testUser } from '@alwaystudios/recipe-bible-sdk'
import * as AuthContext from '../auth/AuthContext'
import { testAuthContext } from '../../test/testAuthContext'
import * as useRatingsModule from '../hooks/useRatings'
import { testUseRatings } from '../../test/testUseRatings'

const getRatings = jest.fn()
const setRating = jest.fn()
const ratings: number[] = []

jest
  .spyOn(useRatingsModule, 'useRatings')
  .mockImplementation(() => testUseRatings({ getRatings, setRating, ratings }))

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
    expect(getRatings).toHaveBeenCalledTimes(1)
    expect(getRatings).toHaveBeenCalledWith(recipe.title)
  })

  it('handles user rating the recipe', () => {
    const { container } = render(<Recipe recipe={recipe} />)

    fireEvent.click(container.querySelectorAll('div.star-container')[0])
    expect(setRating).toHaveBeenCalledTimes(1)
    expect(setRating).toHaveBeenCalledWith(recipe.title, 1)
  })

  it('renders edit button for admin user', () => {
    useAuthContext.mockReturnValueOnce(testAuthContext({ user: testUser() }))
    render(<Recipe recipe={recipe} />)

    fireEvent.click(screen.getByText('edit'))
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/manage/recipes/my-new-recipe')
  })

  it('does not render an edit button for non admin user', () => {
    useAuthContext.mockReturnValueOnce(testAuthContext({ user: testUser({ isAdmin: false }) }))
    render(<Recipe recipe={recipe} />)

    expect(screen.queryByText('edit')).not.toBeInTheDocument()
  })
})
