import { Footer } from './Footer'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import { testUser } from '@alwaystudios/recipe-bible-sdk'
import * as AuthContext from '../auth/AuthContext'
import { testAuthContext } from '../../test/testAuthContext'

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
    useAuthContext.mockReturnValueOnce(testAuthContext({ user: undefined }))
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

    const emailLink = screen.getByRole('email-link')
    expect(emailLink).toBeInTheDocument()
    expect(emailLink.getAttribute('href')).toBe('mailto:recipebiblecontact@gmail.com')

    const facebookLink = screen.getByRole('facebook-link')
    expect(facebookLink).toBeInTheDocument()
    expect(facebookLink.getAttribute('href')).toBe('https://www.facebook.com/pg/RecipeBibleUK')

    const instagramLink = screen.getByRole('instagram-link')
    expect(instagramLink).toBeInTheDocument()
    expect(instagramLink.getAttribute('href')).toBe('https://www.instagram.com/recipebibleuk')

    expect(screen.queryByText('Logout')).not.toBeInTheDocument()
  })

  it('renders the footer when user logged in', () => {
    useAuthContext.mockReturnValueOnce(testAuthContext({ user }))
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

    const emailLink = screen.getByRole('email-link')
    expect(emailLink).toBeInTheDocument()
    expect(emailLink.getAttribute('href')).toBe('mailto:recipebiblecontact@gmail.com')

    const facebookLink = screen.getByRole('facebook-link')
    expect(facebookLink).toBeInTheDocument()
    expect(facebookLink.getAttribute('href')).toBe('https://www.facebook.com/pg/RecipeBibleUK')

    const instagramLink = screen.getByRole('instagram-link')
    expect(instagramLink).toBeInTheDocument()
    expect(instagramLink.getAttribute('href')).toBe('https://www.instagram.com/recipebibleuk')
  })
})
