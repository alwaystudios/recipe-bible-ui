import { CopyAccessToken } from './CopyAccessToken'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import copy from 'copy-to-clipboard'
jest.mock('copy-to-clipboard')
import * as AuthContext from './AuthContext'

const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')

const tokens = { accessToken: '1234', idToken: '4567', expiresAt: 12345 }

describe('ShowToken', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the current user token', () => {
    useAuthContext.mockReturnValueOnce({ tokens } as any)
    const { container } = render(<CopyAccessToken />)
    fireEvent.click(container.querySelector('svg'))
    expect(copy).toHaveBeenCalledTimes(1)
    expect(copy).toHaveBeenCalledWith(tokens.idToken)
  })
})
