import React from 'react'
import { render, screen } from '@testing-library/react'
import { testStep } from '@alwaystudios/recipe-bible-sdk'
import { Steps } from './Steps'

const step1 = testStep('step1')
const step2 = testStep('step2')
const steps = [step1, step2]

describe('steps', () => {
  it('renders steps', () => {
    render(<Steps steps={steps} />)
    steps.map((s) => expect(screen.getByText(s.step)).toBeInTheDocument())
  })
})
