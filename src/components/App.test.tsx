import { App } from './App'
import React from 'react'
import { render } from '@testing-library/react'
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

describe('App', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the app', () => {
    const { getByText } = renderApp()
    expect(getByText('RecipeBible.net')).toBeInTheDocument()
  })
})
