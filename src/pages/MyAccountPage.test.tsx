import { MyAccountPage } from './MyAccountPage'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { testUser } from '@alwaystudios/recipe-bible-sdk'
import * as useAnalyticsModule from '../hooks/useAnalytics'

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

const pageView = jest.fn()
const useAnalytics = jest
  .spyOn(useAnalyticsModule, 'useAnalytics')
  .mockReturnValue({ pageView } as any)

const user = testUser()

describe('MyAccount page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the my account page', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user })
    render(<MyAccountPage />)
    expect(screen.getByText(`Name: ${user.given_name} ${user.family_name}`)).toBeInTheDocument()
    expect(screen.getByText(`Roles: ${user['https://recipebible.net/roles']}`)).toBeInTheDocument()
    expect(useAnalytics).toHaveBeenCalledTimes(1)
    expect(pageView).toHaveBeenCalledTimes(1)
  })

  it('handles logout CTA', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user })
    render(<MyAccountPage />)
    const logoutButton = screen.queryAllByText('Logout')[0]
    expect(logoutButton).toBeInTheDocument()
    fireEvent.click(logoutButton)
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/logout')
  })

  it('handles create CTA', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user })
    render(<MyAccountPage />)
    const createButton = screen.getByText('New recipe')
    expect(createButton).toBeInTheDocument()
    fireEvent.click(createButton)
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/create')
  })
})
