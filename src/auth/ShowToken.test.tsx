import { ShowToken } from './ShowToken'
import React from 'react'
import { render } from '@testing-library/react'

const tokens = { accessToken: '1234', idToken: '4567', expiresAt: 12345 }

describe('ShowToken', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the current user token', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ tokens })
    const { getByText } = render(<ShowToken />)
    expect(getByText(tokens.idToken)).toBeInTheDocument()
  })
})
