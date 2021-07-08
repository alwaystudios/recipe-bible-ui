import { Logout } from './Logout'
import React from 'react'
import { render } from '@testing-library/react'
import * as AuthContext from './AuthContext'
import { testAuthContext } from '../../test/testAuthContext'

const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')

const logout = jest.fn()

describe('Logout', () => {
  beforeEach(jest.clearAllMocks)

  it('handles logout', () => {
    useAuthContext.mockReturnValueOnce(testAuthContext({ logout }))
    render(<Logout />)
    expect(logout).toHaveBeenCalledTimes(1)
  })
})
