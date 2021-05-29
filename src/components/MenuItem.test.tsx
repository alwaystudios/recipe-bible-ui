import { MenuItem } from './MenuItem'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'

describe('MenuItem', () => {
  const text = 'Test Menu Item'

  it('renders with custom class', () => {
    const { container, getByText } = render(<MenuItem className="test-class" label={text} />)
    expect(container.firstChild).toHaveClass('test-class')
    expect(getByText(text)).toBeInTheDocument()
  })

  it('handles onClick', () => {
    const onClick = jest.fn()

    const { getByText } = render(<MenuItem label={text} onClick={onClick} />)
    const menuItem = getByText(text) as HTMLDivElement

    fireEvent.click(menuItem)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
