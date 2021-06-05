import { Advert } from './Advert'
import React from 'react'
import { render } from '@testing-library/react'

describe('Advert', () => {
  beforeEach(jest.clearAllMocks)

  it('renders an advert', () => {
    const src = 'ad src'
    const { container } = render(<Advert src={src} />)
    expect(container.querySelector('iframe').getAttribute('src')).toBe(src)
  })
})
