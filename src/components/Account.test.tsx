import { Account } from './Account'
import React from 'react'
import { render } from '@testing-library/react'
import { testUser } from '@alwaystudios/recipe-bible-sdk'

const user = testUser()

describe('Account', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the current logged in user with photo', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user })
    const { getByText, container } = render(<Account />)
    expect(getByText(user.name)).toBeInTheDocument()
    expect(container.querySelector('img').src).toBe(user.picture)
  })

  it('renders login when no user is logged in', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ user: undefined })
    const { getByText, container } = render(<Account />)
    expect(getByText('Login')).toBeInTheDocument()
    expect(container.querySelectorAll('img').length).toBe(0)
  })
})
