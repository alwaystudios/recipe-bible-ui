import { App } from './App'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import * as AuthContext from '../auth/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'

const renderApp = () =>
  render(
    <Router>
      <App />
    </Router>
  )

const AuthProviderMock: React.FC = ({ children }) => <>{children}</>

jest.spyOn(AuthContext, 'AuthProvider').mockImplementation(AuthProviderMock)

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

describe('App', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the app', () => {
    const { getByText } = renderApp()
    expect(getByText(`What's cooking`)).toBeInTheDocument()
    expect(getByText('My cookbook')).toBeInTheDocument()
  })

  it('renders whats cooking route', () => {
    const { getByText } = renderApp()
    fireEvent.click(getByText(`What's cooking`))
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/')
  })

  it('renders my cookbook route', () => {
    const { getByText } = renderApp()
    fireEvent.click(getByText('My cookbook'))
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/account/cookbook')
  })
})
