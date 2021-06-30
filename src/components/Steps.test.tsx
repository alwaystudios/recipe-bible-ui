import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { testStep } from '@alwaystudios/recipe-bible-sdk'
import { Steps } from './Steps'

const step1 = testStep('step1')
const step2 = testStep('step2')
const steps = [step1, step2]

const onDelete = jest.fn()
const setSteps = jest.fn()

describe('steps', () => {
  it('renders steps', () => {
    render(<Steps steps={steps} />)
    steps.map((s) => expect(screen.getByText(s.step)).toBeInTheDocument())
  })

  it('handles delete', () => {
    render(<Steps steps={steps} setSteps={setSteps} onDelete={onDelete} />)
    fireEvent.click(screen.getAllByText('delete')[0])
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith('step1')
  })
})
