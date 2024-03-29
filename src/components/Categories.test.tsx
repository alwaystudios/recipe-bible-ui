import { Categories } from './Categories'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { lorem } from 'faker'

describe('Categories', () => {
  beforeEach(jest.clearAllMocks)

  it('renders a series of categories', () => {
    const categories = [lorem.words(2), lorem.words(2), lorem.words(2)]
    render(<Categories categories={categories} />)
    categories.map((c) => expect(screen.getByText(c)).toBeInTheDocument())
  })
})
