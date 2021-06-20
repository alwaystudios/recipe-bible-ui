import { Header } from './Header'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

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

describe('Header', () => {
  beforeEach(jest.clearAllMocks)

  it('renders with main header', () => {
    render(<Header mainText="Heading" />)
    expect(screen.getByText('Heading')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <Header mainText="Heading">
        <div>children</div>
      </Header>
    )
    expect(screen.getByText('children')).toBeInTheDocument()
  })

  it('renders account component', () => {
    const { container } = render(
      <Header mainText="Heading">
        <div>children</div>
      </Header>
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('links to main page', () => {
    render(<Header mainText="Heading" />)
    fireEvent.click(screen.getByText('Heading'))
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/recipes')
  })

  it('links to /about page', () => {
    render(<Header mainText="Heading" />)
    fireEvent.click(screen.getByAltText('logo'))
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/about')
  })
})
