import { Footer } from './Footer'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import { testUser } from '@alwaystudios/recipe-bible-sdk'
import * as AuthContext from '../auth/AuthContext'

const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')

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
    useAuthContext.mockReturnValueOnce({ user: undefined } as any)
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
    useAuthContext.mockReturnValueOnce({ user } as any)
    renderFooter()

    const recipes = screen.getByText('Recipes')
    expect(recipes).toBeInTheDocument()
    expect(recipes.getAttribute('href')).toBe('/recipes')

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
