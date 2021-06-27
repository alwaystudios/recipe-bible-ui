import { MyAccountPage } from './MyAccountPage'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { testUser } from '@alwaystudios/recipe-bible-sdk'
import * as useAnalyticsModule from '../hooks/useAnalytics'
import * as AuthContext from '../auth/AuthContext'

const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')

const pageView = jest.fn()
const useAnalytics = jest
  .spyOn(useAnalyticsModule, 'useAnalytics')
  .mockReturnValue({ pageView } as any)

const user = testUser()

describe('MyAccount page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the my account page', () => {
    useAuthContext.mockReturnValueOnce({ user } as any)
    render(<MyAccountPage />)
    expect(screen.getByText(`Name: ${user.given_name} ${user.family_name}`)).toBeInTheDocument()
    expect(screen.getByText(`Roles: ${user['https://recipebible.net/roles']}`)).toBeInTheDocument()
    expect(useAnalytics).toHaveBeenCalledTimes(1)
    expect(pageView).toHaveBeenCalledTimes(1)
  })
})
