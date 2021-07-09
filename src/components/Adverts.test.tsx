import React from 'react'
import { render } from '@testing-library/react'
import { testAdvert } from '@alwaystudios/recipe-bible-sdk'
import * as useAdvertsModule from '../hooks/useAdverts'
import { testUseAdverts } from '../../test/testUseAdverts'
import { Adverts } from './Adverts'

const adverts = [...Array(10)].map(() => testAdvert())
const getAdverts = jest.fn()
jest.spyOn(useAdvertsModule, 'useAdverts').mockReturnValue(testUseAdverts({ getAdverts, adverts }))

describe('adverts', () => {
  it('renders with adverts', () => {
    render(<Adverts />)
    expect(getAdverts).toHaveBeenCalledTimes(1)
  })
})
