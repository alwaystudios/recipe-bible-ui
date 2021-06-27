import { AdminMenu, links } from './AdminMenu'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import * as authContext from '../auth/AuthContext'
import { testUser } from '@alwaystudios/recipe-bible-sdk'

const useAuthContext = jest.spyOn(authContext, 'useAuthContext')

const renderMenu = () =>
  render(
    <Router>
      <AdminMenu />
    </Router>
  )

describe('AdminMenu', () => {
  beforeEach(jest.clearAllMocks)

  it('does not render for non admin user', () => {
    renderMenu()
    links.map((link) => expect(screen.queryByText(link.text)).not.toBeInTheDocument())
  })

  it('does not render for non logged in user', () => {
    useAuthContext.mockReturnValueOnce({
      user: testUser({ isAdmin: false }),
    } as any)
    renderMenu()
    links.map((link) => expect(screen.queryByText(link.text)).not.toBeInTheDocument())
  })

  test.each([links])('renders %s link', (link: { to: string; text: string }) => {
    useAuthContext.mockReturnValueOnce({
      user: testUser(),
    } as any)
    renderMenu()
    const _link = screen.getByText(link.text)
    expect(_link).toBeInTheDocument()
    expect(_link.getAttribute('href')).toBe(link.to)
  })
})
