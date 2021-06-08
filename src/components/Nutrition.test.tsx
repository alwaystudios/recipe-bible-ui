/* eslint-disable jest/no-conditional-expect */
import { Nutrition } from './Nutrition'
import { render } from '@testing-library/react'
import React from 'react'
import { pathOr } from 'ramda'

describe('Nutritional information', () => {
  test.each([
    ['fat-value', 'carbs-value', 'protein-value'],
    [undefined, 'carbs-value', 'protein-value'],
    ['', 'carbs-value', 'protein-value'],
    [null, 'carbs-value', 'protein-value'],
    ['fat-value', undefined, 'protein-value'],
    ['fat-value', '', 'protein-value'],
    ['fat-value', null, 'protein-value'],
    ['fat-value', 'carbs-value', undefined],
    ['fat-value', 'carbs-value', ''],
    ['fat-value', 'carbs-value', null],
  ])('renders nutritional information', (fat, carbs, protein) => {
    const { getByText, queryByText } = render(
      <Nutrition fat={fat} carbs={carbs} protein={protein} />
    )
    const nutritionalInfo = [{ fat: fat || '' }, { carbs: carbs || '' }, { protein: protein || '' }]

    nutritionalInfo.map((type) => {
      const label = Object.keys(type)[0]
      const value = pathOr(undefined, [label], type)
      if (value) {
        expect(getByText(value)).toBeInTheDocument()
        expect(getByText(label)).toBeInTheDocument()
      } else {
        expect(queryByText(label)).not.toBeInTheDocument()
      }
    })
  })
})
