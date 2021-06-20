import { Callback } from './Callback'
import React from 'react'
import { render } from '@testing-library/react'
import { testUser } from '@alwaystudios/recipe-bible-sdk'
import * as AuthContext from './AuthContext'

const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')

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

const handleAuthentication = jest.fn()

describe('Callback', () => {
  beforeEach(jest.clearAllMocks)

  it('handles authentication when there is no user', () => {
    useAuthContext.mockReturnValueOnce({ handleAuthentication, user: undefined } as any)
    render(<Callback />)
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/recipes')
    expect(handleAuthentication).toHaveBeenCalledTimes(1)
  })

  it('skips authentication when there is a user', () => {
    useAuthContext.mockReturnValueOnce({ handleAuthentication, user: testUser() } as any)
    render(<Callback />)
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/recipes')
    expect(handleAuthentication).not.toHaveBeenCalled()
  })
})
