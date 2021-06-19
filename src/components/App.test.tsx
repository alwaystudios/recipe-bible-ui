import { App } from './App'
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as AuthContext from '../auth/AuthContext'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import * as authenticatedRouteModule from '../auth/AuthenticatedRoute'
import * as aboutPageModule from '../pages/AboutPage'
import * as whatsCookingModule from '../pages/WhatsCookingPage'
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

  test.each([['account'], ['create']])('renders authenticates route /%s', (route) => {
    MockComponent.mockReturnValueOnce(<>{route} mock</>)
    renderApp(`/${route}`)
    expect(screen.getByText(`${route} mock`)).toBeInTheDocument()
  })

  test.each([
    ['/about', 'about mock', aboutPageModule, 'AboutPage'],
    ['/logout', 'logout mock', logoutModule, 'Logout'],
    ['/recipes', 'recipe mock', whatsCookingModule, 'WhatsCookingPage'],
    ['/', 'callback mock', callbackModule, 'Callback'],
  ])('renders %s route', (route, mockText, module, page) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(module, page).mockReturnValueOnce(<>{mockText}</>)
    renderApp(route)
    expect(screen.getByText(mockText)).toBeInTheDocument()
  })
})
