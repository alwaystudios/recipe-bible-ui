import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { YouWillNeed } from './YouWillNeed'
import { lorem } from 'faker'

const onDelete = jest.fn()
const values = [lorem.words(2), lorem.words(3), lorem.words(2)]

describe('you will need', () => {
  beforeEach(jest.clearAllMocks)

  it('renders in read only mode', () => {
    render(<YouWillNeed values={values} />)

    values.map((v) => expect(screen.getByText(v)).toBeInTheDocument())

    fireEvent.click(screen.getByText(values[0]))

    expect(onDelete).not.toHaveBeenCalled()
  })

  test.each([values])('handles on delete for %s', (value: string) => {
    render(<YouWillNeed values={values} onDelete={onDelete} />)

    values.map((v) => expect(screen.getByText(v)).toBeInTheDocument())

    fireEvent.click(screen.getByText(value))

    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith(value)
  })
})
