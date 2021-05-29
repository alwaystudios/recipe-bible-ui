import { Logout } from './Logout'
import React from 'react'
import { render } from '@testing-library/react'

const logout = jest.fn()

describe('Logout', () => {
  beforeEach(jest.clearAllMocks)

  it('renders a route for an authenticated user', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ logout })
    render(<Logout />)
    expect(logout).toHaveBeenCalledTimes(1)
  })
})
