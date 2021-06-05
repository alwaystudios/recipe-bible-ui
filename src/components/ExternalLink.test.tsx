import { ExternalLink } from './ExternalLink'
import React from 'react'
import { render } from '@testing-library/react'

describe('External link', () => {
  beforeEach(jest.clearAllMocks)

  it('renders an external link', () => {
    const { container } = render(<ExternalLink href="test link" />)
    const link = container.querySelector('a')
    expect(link.getAttribute('href')).toBe('test link')
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('renders children', () => {
    const { getByText } = render(
      <ExternalLink href="test link">
        <div>child component</div>
      </ExternalLink>
    )
    expect(getByText('child component')).toBeInTheDocument()
  })
})
