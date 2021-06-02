import { Header } from './Header'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'

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
    const { getByText } = render(<Header mainText="Heading" />)
    expect(getByText('Heading')).toBeInTheDocument()
  })

  it('renders children', () => {
    const { getByText } = render(
      <Header mainText="Heading">
        <div>children</div>
      </Header>
    )
    expect(getByText('children')).toBeInTheDocument()
  })

  it('renders account component', () => {
    const { getByText } = render(
      <Header mainText="Heading">
        <div>children</div>
      </Header>
    )
    expect(getByText('My Account')).toBeInTheDocument()
  })

  it('links to main page', () => {
    const { getByText } = render(<Header mainText="Heading" />)
    fireEvent.click(getByText('Heading'))
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/')
  })

  it('links to /about page', () => {
    const { getByAltText } = render(<Header mainText="Heading" />)
    fireEvent.click(getByAltText('logo'))
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/about')
  })
})
