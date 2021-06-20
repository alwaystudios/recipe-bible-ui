import React from 'react'
import { render, screen } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('hides children when loading', () => {
    const { container } = render(
      <Spinner isLoading={true}>
        <div className="content">content</div>
      </Spinner>
    )
    expect(screen.queryByText('content')).not.toBeInTheDocument()
    expect(container.firstChild).toHaveClass('spinner')
  })

  it('is loading by default', () => {
    const { container } = render(
      <Spinner>
        <div className="content">content</div>
      </Spinner>
    )
    expect(screen.queryByText('content')).not.toBeInTheDocument()
    expect(container.firstChild).toHaveClass('spinner')
  })

  it('renders children when not loading', () => {
    const { container } = render(
      <Spinner isLoading={false}>
        <div className="content">content</div>
      </Spinner>
    )
    expect(screen.getByText('content')).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('content')
  })
})
