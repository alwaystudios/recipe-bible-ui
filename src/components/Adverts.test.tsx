import { Adverts } from './Adverts'
import React from 'react'
import { render } from '@testing-library/react'

describe('Adverts', () => {
  beforeEach(jest.clearAllMocks)

  it('renders adverts', () => {
    const ads = ['ad src 1', 'ad src 2']
    const { container } = render(<Adverts ads={ads} />)
    const adverts = container.querySelectorAll('iframe')

    adverts.forEach((advert, index) => expect(advert.getAttribute('src')).toBe(ads[index]))
  })
})
