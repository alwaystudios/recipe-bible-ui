import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { testStep } from '@alwaystudios/recipe-bible-sdk'
import { Step } from './Step'

const step = testStep()

describe('step', () => {
  it('renders a step', () => {
    render(<Step index={1} step={step} />)
    expect(screen.getByText(1)).toBeInTheDocument()
    expect(screen.getByText(step.step)).toBeInTheDocument()
  })

  it('handles on delete step', () => {
    const onDelete = jest.fn()
    render(<Step index={1} step={step} onDelete={onDelete} />)
    fireEvent.click(screen.getByRole('delete-icon'))
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith(step.step)
  })
})
