import { BackToLink } from './BackToLink'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { lorem } from 'faker'
import { MemoryRouter as Router } from 'react-router-dom'

const to = lorem.word()
const renderLink = (text?: string) => {
  render(
    <Router>
      <BackToLink to={to} text={text} />
    </Router>
  )
  return screen.getByRole('link')
}

describe('BackToLink', () => {
  it('renders default text', () => {
    const link = renderLink()
    expect(screen.getByText('back')).toBeInTheDocument()
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe(`/${to}`)
  })

  it('renders custom text', () => {
    const link = renderLink('custom')
    expect(screen.getByText('custom')).toBeInTheDocument()
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe(`/${to}`)
  })
})
