import { AuthenticatedRoute } from './AuthenticatedRoute'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { testUser } from '@alwaystudios/recipe-bible-sdk'
import * as AuthContext from './AuthContext'
import { testAuthContext } from '../../test/testAuthContext'

const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')

const push = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push,
  }),
}))

const Component = () => <div>component</div>

const user = testUser()
const login = jest.fn()

const renderRoute = (role?: string) =>
  render(
    <Router>
      <Link to="/route">click link</Link>
      <AuthenticatedRoute path="/route" role={role} component={Component} />
    </Router>
  )

describe('AuthenticatedRoute', () => {
  beforeEach(jest.clearAllMocks)

  it('renders a route for an authenticated user', () => {
    useAuthContext.mockReturnValueOnce(testAuthContext({ login, user, tokenExpired: false }))
    renderRoute()
    fireEvent.click(screen.getByText('click link'))
    expect(login).not.toHaveBeenCalled()
    expect(push).not.toHaveBeenCalled()
    expect(screen.getByText('component')).toBeInTheDocument()
  })

  it('renders a route for an authenticated user with required role', () => {
    useAuthContext.mockReturnValueOnce(testAuthContext({ login, user, tokenExpired: false }))
    renderRoute('admin')
    fireEvent.click(screen.getByText('click link'))
    expect(login).not.toHaveBeenCalled()
    expect(push).not.toHaveBeenCalled()
    expect(screen.getByText('component')).toBeInTheDocument()
  })

  it('redirects to 403 if user does not have the required role', () => {
    useAuthContext.mockReturnValueOnce(testAuthContext({ login, user, tokenExpired: false }))
    renderRoute('user-does-not-have-this-role')
    fireEvent.click(screen.getByText('click link'))
    expect(login).not.toHaveBeenCalled()
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/403')
  })

  it('requires authentication for an authenticated user', () => {
    useAuthContext.mockReturnValueOnce(
      testAuthContext({ login, user: undefined, tokenExpired: false })
    )
    renderRoute()
    fireEvent.click(screen.getByText('click link'))
    expect(login).toHaveBeenCalledTimes(1)
    expect(push).not.toHaveBeenCalled()
    expect(screen.queryByText('component')).not.toBeInTheDocument()
  })

  it('requires authentication for an expired token', () => {
    useAuthContext.mockReturnValueOnce(testAuthContext({ login, user, tokenExpired: true }))
    renderRoute()
    fireEvent.click(screen.getByText('click link'))
    expect(login).toHaveBeenCalledTimes(1)
    expect(push).not.toHaveBeenCalled()
    expect(screen.queryByText('component')).not.toBeInTheDocument()
  })
})
