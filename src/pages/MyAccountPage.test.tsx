import { MyAccountPage } from './MyAccountPage'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
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
    const { getByText } = render(<MyAccountPage />)
    expect(getByText(`Name: ${user.given_name} ${user.family_name}`)).toBeInTheDocument()
    expect(getByText(`Roles: ${user['https://recipebible.net/roles']}`)).toBeInTheDocument()
    expect(useAnalytics).toHaveBeenCalledTimes(1)
    expect(pageView).toHaveBeenCalledTimes(1)
  })

  it('handles logout CTA', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user })
    const { container } = render(<MyAccountPage />)
    const logoutButton = container.querySelector('button.btn__logout')
    expect(logoutButton).toBeInTheDocument()
    fireEvent.click(logoutButton)
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/logout')
  })
})
