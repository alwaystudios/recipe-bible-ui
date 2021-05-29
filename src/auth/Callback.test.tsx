import { Callback } from './Callback'
import React from 'react'
import { render } from '@testing-library/react'

const handleAuthentication = jest.fn()

describe('Callback', () => {
  beforeEach(jest.clearAllMocks)

  it('handles authentication', () => {
    jest.spyOn(React, 'useContext').mockReturnValueOnce({ handleAuthentication })
    render(<Callback />)
    expect(handleAuthentication).toHaveBeenCalledTimes(1)
  })
})
