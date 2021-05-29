import { AuthenticatedRoute } from './AuthenticatedRoute'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { testUser } from '@alwaystudios/recipe-bible-sdk'

const Component = () => <div>component</div>

const user = testUser()
const login = jest.fn()

const renderRoute = () =>
  render(
    <Router>
      <Link to="/route">click link</Link>
      <AuthenticatedRoute path="/route" component={Component} />
    </Router>
  )

describe('AuthenticatedRoute', () => {
  beforeEach(jest.clearAllMocks)

  it('renders a route for an authenticated user', async () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ login, user, tokenExpired: false })
    const { getByText, findByText } = renderRoute()
    fireEvent.click(getByText('click link'))
    await findByText('component')
    expect(login).not.toHaveBeenCalled()
  })

  it('requires authentication for an unauthenticated user', async () => {
    jest
      .spyOn(React, 'useContext')
      .mockReturnValueOnce({ login, user: undefined, tokenExpired: false })
    const { getByText } = renderRoute()
    fireEvent.click(getByText('click link'))
    await expect(login).toHaveBeenCalledTimes(1)
  })

  it('requires authentication for an expired token', async () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ login, user, tokenExpired: true })
    const { getByText } = renderRoute()
    fireEvent.click(getByText('click link'))
    await expect(login).toHaveBeenCalledTimes(1)
  })
})
