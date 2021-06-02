import { CopyAccessToken } from './CopyAccessToken'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import copy from 'copy-to-clipboard'
jest.mock('copy-to-clipboard')

const tokens = { accessToken: '1234', idToken: '4567', expiresAt: 12345 }

describe('ShowToken', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the current user token', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ tokens })
    const { container } = render(<CopyAccessToken />)
    fireEvent.click(container.querySelector('svg'))
    expect(copy).toHaveBeenCalledTimes(1)
    expect(copy).toHaveBeenCalledWith(tokens.idToken)
  })
})
