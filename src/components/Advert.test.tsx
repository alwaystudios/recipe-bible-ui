import { Advert } from './Advert'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { internet } from 'faker'

global.open = jest.fn()

describe('Advert', () => {
  beforeEach(jest.clearAllMocks)
  afterAll(jest.resetAllMocks)

  it('renders an advert', () => {
    const src = 'ad src'
    const href = internet.url()
    const { container } = render(<Advert src={src} href={href} />)
    expect(container.querySelector('iframe').getAttribute('src')).toBe(src)
  })

  it('handles on click advert', () => {
    const src = 'ad src'
    const href = internet.url()
    render(<Advert src={src} href={href} />)
    fireEvent.click(screen.getByRole('iframe-mask'))
    expect(global.open).toHaveBeenCalledTimes(1)
    expect(global.open).toHaveBeenCalledWith(href, '_blank')
  })

  it('no on click event when no href', () => {
    const src = 'ad src'
    render(<Advert src={src} />)
    fireEvent.click(screen.getByRole('iframe-mask'))
    expect(global.open).not.toHaveBeenCalled()
  })
})
