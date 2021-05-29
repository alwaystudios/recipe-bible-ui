import { Header } from './Header'
import React from 'react'
import { render } from '@testing-library/react'

describe('Header', () => {
  const text = 'Heading'

  it('renders with main header', () => {
    const { getByText, container } = render(<Header mainText={text} />)
    expect(getByText(text)).toBeInTheDocument()
    expect(container.querySelector('.header-link')).not.toBeInTheDocument()
  })

  it('renders children', () => {
    const { getByText } = render(<Header mainText={text}>children</Header>)
    expect(getByText('children')).toBeInTheDocument()
  })

  it('renders account component', () => {
    const accountComponent = <div>my account</div>
    const { getByText } = render(
      <Header mainText={text} accountComponent={accountComponent}>
        children
      </Header>
    )
    expect(getByText('my account')).toBeInTheDocument()
  })
})
