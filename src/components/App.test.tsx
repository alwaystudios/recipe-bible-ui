import { App } from './App'
import React from 'react'
import { render } from '@testing-library/react'
import * as AuthContext from '../auth/AuthContext'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import * as authenticatedRouteModule from '../auth/AuthenticatedRoute'
import * as aboutPageModule from '../pages/About'
import * as whatsCookingModule from '../pages/WhatsCooking'
import * as callbackModule from '../auth/Callback'
import * as logoutModule from '../auth/Logout'

const AuthProviderMock: React.FC = ({ children }) => <>{children}</>
const AuthProvider = jest.spyOn(AuthContext, 'AuthProvider').mockImplementation(AuthProviderMock)

const MockComponent = jest.fn()
const AuthenticatedRouteMock: React.FC<{
  component: React.ElementType
  path: string
}> = ({ path }) => <Route path={path}>{<MockComponent />}</Route>

jest
  .spyOn(authenticatedRouteModule, 'AuthenticatedRoute')
  .mockImplementation(AuthenticatedRouteMock)

const renderApp = (route = '/') =>
  render(
    <Router initialEntries={[route]}>
      <App />
    </Router>
  )

describe('App', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the app', () => {
    jest.spyOn(callbackModule, 'Callback').mockReturnValueOnce(<>redirect from root mock</>)
    const { getByText } = renderApp()
    expect(getByText('RecipeBible.net')).toBeInTheDocument()
    expect(AuthProvider).toHaveBeenCalledTimes(1)
    expect(getByText('redirect from root mock')).toBeInTheDocument()
  })

  it('renders /account route', () => {
    MockComponent.mockReturnValueOnce(<>my account mock</>)
    const { getByText } = renderApp('/account')
    expect(getByText('my account mock')).toBeInTheDocument()
  })

  it('renders /about route', () => {
    jest.spyOn(aboutPageModule, 'AboutPage').mockReturnValueOnce(<>about mock</>)
    const { getByText } = renderApp('/about')
    expect(getByText('about mock')).toBeInTheDocument()
  })

  it('renders /logout route', () => {
    jest.spyOn(logoutModule, 'Logout').mockReturnValueOnce(<>logout mock</>)
    const { getByText } = renderApp('/logout')
    expect(getByText('logout mock')).toBeInTheDocument()
  })

  it('renders /recipes route', () => {
    jest.spyOn(whatsCookingModule, 'WhatsCookingPage').mockReturnValueOnce(<>whats cooking mock</>)
    const { getByText } = renderApp('/recipes')
    expect(getByText('whats cooking mock')).toBeInTheDocument()
  })

  it('renders / route', () => {
    jest.spyOn(callbackModule, 'Callback').mockReturnValueOnce(<>callback mock</>)
    const { getByText } = renderApp('/auth')
    expect(getByText('callback mock')).toBeInTheDocument()
  })
})
