import { Account } from './Account'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { testUser } from '@alwaystudios/recipe-bible-sdk'
import * as AuthContext from '../auth/AuthContext'

const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')

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
    useAuthContext.mockReturnValueOnce({ user } as any)
    const { container } = render(<Account />)
    expect(screen.getByText(user.name)).toBeInTheDocument()
    expect(container.querySelector('img').src).toBe(user.picture)
  })

  it('handles on click user name', () => {
    useAuthContext.mockReturnValueOnce({ user } as any)
    render(<Account />)
    fireEvent.click(screen.getByText(user.name))
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/account')
  })

  it('renders login CTA when no user is logged in', () => {
    useAuthContext.mockReturnValueOnce({ user: undefined } as any)
    const { container } = render(<Account />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.querySelectorAll('img').length).toBe(0)
  })

  it('handles on click login CTA', () => {
    useAuthContext.mockReturnValueOnce({ user: undefined } as any)
    const { container } = render(<Account />)
    fireEvent.click(container.querySelector('svg'))
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/account')
  })
})
