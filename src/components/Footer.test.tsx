import { Footer } from './Footer'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import { testUser } from '@alwaystudios/recipe-bible-sdk'

const user = testUser()

const renderFooter = () =>
  render(
    <Router>
      <Footer />
    </Router>
  )

describe('Footer', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the footer when user not logged in', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user: undefined })
    renderFooter()

    const about = screen.getByText('About')
    expect(about).toBeInTheDocument()
    expect(about.getAttribute('href')).toBe('/about')

    const tsAndCs = screen.getByText('Terms and conditions')
    expect(tsAndCs).toBeInTheDocument()
    expect(tsAndCs.getAttribute('href')).toBe('/terms')

    const privacyPolicy = screen.getByText('Privacy policy')
    expect(privacyPolicy).toBeInTheDocument()
    expect(privacyPolicy.getAttribute('href')).toBe('/privacy')

    expect(screen.queryByText('Logout')).not.toBeInTheDocument()
  })

  it('renders the footer when user logged in', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user })
    renderFooter()

    const about = screen.getByText('About')
    expect(about).toBeInTheDocument()
    expect(about.getAttribute('href')).toBe('/about')

    const tsAndCs = screen.getByText('Terms and conditions')
    expect(tsAndCs).toBeInTheDocument()
    expect(tsAndCs.getAttribute('href')).toBe('/terms')

    const privacyPolicy = screen.getByText('Privacy policy')
    expect(privacyPolicy).toBeInTheDocument()
    expect(privacyPolicy.getAttribute('href')).toBe('/privacy')

    const logout = screen.getByText('Logout')
    expect(logout).toBeInTheDocument()
    expect(logout.getAttribute('href')).toBe('/logout')
  })
})
