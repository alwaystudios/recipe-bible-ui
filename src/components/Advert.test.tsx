import { Advert } from './Advert'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { internet } from 'faker'

describe('Advert', () => {
  beforeEach(jest.clearAllMocks)

  it('renders an advert', () => {
    const src = 'ad src'
    const href = internet.url()
    const { container } = render(<Advert src={src} href={href} />)
    expect(container.querySelector('iframe').getAttribute('src')).toBe(src)
  })

  it('handles on click advert', () => {
    global.open = jest.fn()
    const src = 'ad src'
    const href = internet.url()
    render(<Advert src={src} href={href} />)
    fireEvent.click(screen.getByRole('iframe-mask'))
    expect(global.open).toHaveBeenCalledTimes(1)
    expect(global.open).toHaveBeenCalledWith(href, '_blank')
  })
})
