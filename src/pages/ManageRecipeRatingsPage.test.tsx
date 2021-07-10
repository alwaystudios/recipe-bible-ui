import React from 'react'
import { render, screen } from '@testing-library/react'
import * as useRatingsModule from '../hooks/useRatings'
import { recipeTitleTransformer, testRecipeRating } from '@alwaystudios/recipe-bible-sdk'
import { testUseRatings } from '../../test/testUseRatings'
import { ManageRecipeRatingsPage } from './ManageRecipeRatingsPage'

const allRatings = [...Array(10)].map(() => testRecipeRating())
const getAllRatings = jest.fn()
jest
  .spyOn(useRatingsModule, 'useRatings')
  .mockReturnValue(testUseRatings({ getAllRatings, allRatings }))

describe('manage recipe ratings page', () => {
  it('renders with all recipe ratings', () => {
    render(<ManageRecipeRatingsPage />)
    expect(screen.getByText('Recipe ratings')).toBeInTheDocument()
    expect(getAllRatings).toHaveBeenCalledTimes(1)
    allRatings.map(({ title, rating }) =>
      expect(screen.getByText(`${recipeTitleTransformer(title)} - ${rating}`)).toBeInTheDocument()
    )
  })
})
