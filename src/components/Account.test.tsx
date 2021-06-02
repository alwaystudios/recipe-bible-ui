import { Account } from './Account'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { testUser } from '@alwaystudios/recipe-bible-sdk'

const push = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push,
  }),
  useLocation: () => ({
    pathname: 'some pathname',
  }),
}))

const user = testUser()

describe('Account', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the current logged in user with photo', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user })
    const { getByText, container } = render(<Account />)
    expect(getByText(user.name)).toBeInTheDocument()
    expect(container.querySelector('img').src).toBe(user.picture)
  })

  it('renders login CTA when no user is logged in', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user: undefined })
    const { getByText, container } = render(<Account />)
    expect(getByText('My Account')).toBeInTheDocument()
    expect(container.querySelectorAll('img').length).toBe(0)
  })

  test.each([
    [user, user.name],
    [undefined, 'My Account'],
  ])('handles on click', (user, text) => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user })
    const { getByText } = render(<Account />)
    fireEvent.click(getByText(text))
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/account')
  })
})
