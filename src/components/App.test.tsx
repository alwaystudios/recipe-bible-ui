import { App } from './App'
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as AuthContext from '../auth/AuthContext'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import * as authenticatedRouteModule from '../auth/AuthenticatedRoute'
import * as aboutPageModule from '../pages/AboutPage'
import * as whatsCookingModule from '../pages/WhatsCookingPage'
import * as callbackModule from '../auth/Callback'
import * as ingredientsPageModule from '../pages/IngredientsPage'
import * as logoutModule from '../auth/Logout'
import * as http403Module from '../pages/403'
import * as AdvertsModule from './Adverts'

const Adverts = jest.spyOn(AdvertsModule, 'Adverts').mockImplementation(() => <>adverts mock</>)

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
    renderApp()
    expect(screen.getByText('RecipeBible.net')).toBeInTheDocument()
    expect(AuthProvider).toHaveBeenCalledTimes(1)
    expect(screen.getByText('redirect from root mock')).toBeInTheDocument()
    expect(Adverts).toHaveBeenCalledTimes(1)
    expect(screen.getByText('adverts mock')).toBeInTheDocument()
  })

  test.each([
    ['account'],
    ['manage/recipes/create'],
    ['manage/recipes'],
    ['manage/adverts'],
    ['manage/recipes/some-test-recipe'],
  ])('renders authenticates route /%s', (route) => {
    MockComponent.mockReturnValueOnce(<>{route} mock</>)
    renderApp(`/${route}`)
    expect(screen.getByText(`${route} mock`)).toBeInTheDocument()
  })

  test.each([
    ['/about', 'about mock', aboutPageModule, 'AboutPage'],
    ['/logout', 'logout mock', logoutModule, 'Logout'],
    ['/recipes', 'recipe mock', whatsCookingModule, 'WhatsCookingPage'],
    ['/ingredients', 'ingredients mock', ingredientsPageModule, 'IngredientsPage'],
    ['/403', 'http 403 mock', http403Module, 'Http403'],
    ['/', 'callback mock', callbackModule, 'Callback'],
  ])('renders %s route', (route, mockText, module, page) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(module, page).mockReturnValueOnce(<>{mockText}</>)
    renderApp(route)
    expect(screen.getByText(mockText)).toBeInTheDocument()
  })

  it('renders 404 when route not found', () => {
    renderApp('/not-a-valid-route')
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('not found')).toBeInTheDocument()
  })
})
