import { MyAccountPage } from './MyAccountPage'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { testUser } from '@alwaystudios/recipe-bible-sdk'
import * as AuthContext from '../auth/AuthContext'
import * as WhatsCookingPageModule from './WhatsCookingPage'

jest
  .spyOn(WhatsCookingPageModule, 'WhatsCookingPage')
  .mockImplementation(() => <>whats cooking mock</>)
const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')

const user = testUser()

describe('MyAccount page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the my account page for an admin user', () => {
    useAuthContext.mockReturnValueOnce({ user } as any)
    render(<MyAccountPage />)
    expect(screen.getByText(`Name: ${user.given_name} ${user.family_name}`)).toBeInTheDocument()
    expect(screen.getByText(`Roles: ${user['https://recipebible.net/roles']}`)).toBeInTheDocument()
  })

  it('renders the recipes page for a non admin user', () => {
    useAuthContext.mockReturnValueOnce({ user: { ...user, isAdmin: false } } as any)
    render(<MyAccountPage />)
    expect(screen.getByText('whats cooking mock')).toBeInTheDocument()
  })
})
