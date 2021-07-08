import { MyAccountPage } from './MyAccountPage'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { testUser } from '@alwaystudios/recipe-bible-sdk'
import * as AuthContext from '../auth/AuthContext'
import * as WhatsCookingPageModule from './WhatsCookingPage'
import * as CopyAccessTokenModule from '../auth/CopyAccessToken'
import { testAuthContext } from '../../test/testAuthContext'

jest.spyOn(CopyAccessTokenModule, 'CopyAccessToken').mockReturnValue(<>mock copy access token</>)
jest.spyOn(WhatsCookingPageModule, 'WhatsCookingPage').mockReturnValue(<>whats cooking mock</>)
const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')

const user = testUser()

describe('MyAccount page', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the my account page for an admin user', () => {
    useAuthContext.mockReturnValueOnce(testAuthContext({ user }))
    render(<MyAccountPage />)
    expect(screen.queryByText('whats cooking mock')).not.toBeInTheDocument()
    expect(screen.getByText('mock copy access token')).toBeInTheDocument()
  })

  it('renders the recipes page for a non admin user', () => {
    useAuthContext.mockReturnValueOnce(testAuthContext({ user: { ...user, isAdmin: false } }))
    render(<MyAccountPage />)
    expect(screen.getByText('whats cooking mock')).toBeInTheDocument()
    expect(screen.queryByText('mock copy access token')).not.toBeInTheDocument()
  })
})
