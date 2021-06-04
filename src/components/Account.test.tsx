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

  it('handles on click user name', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user })
    const { getByText } = render(<Account />)
    fireEvent.click(getByText(user.name))
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/account')
  })

  it('renders login CTA when no user is logged in', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user: undefined })
    const { container } = render(<Account />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.querySelectorAll('img').length).toBe(0)
  })

  it('handles on click login CTA', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user: undefined })
    const { container } = render(<Account />)
    fireEvent.click(container.querySelector('svg'))
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/account')
  })
})
