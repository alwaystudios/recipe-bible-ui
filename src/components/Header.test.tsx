import { Header } from './Header'
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

const renderHeader = (children?: React.ReactNode) =>
  render(
    <Router>
      <Header mainText="Heading">{children}</Header>
    </Router>
  )

describe('Header', () => {
  it('renders with main header', () => {
    const { getByText } = renderHeader()
    expect(getByText('Heading')).toBeInTheDocument()
  })

  it('renders children', () => {
    const { getByText } = renderHeader(<div>children</div>)
    expect(getByText('children')).toBeInTheDocument()
  })

  it('renders account component', () => {
    const { getByText } = renderHeader(<div>children</div>)
    expect(getByText('Login')).toBeInTheDocument()
  })
})
