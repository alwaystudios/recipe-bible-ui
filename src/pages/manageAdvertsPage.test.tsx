import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { ManageAdvertsPage } from './manageAdvertsPage'
import * as useAdvertsModule from '../hooks/useAdverts'
import { testUseAdverts } from '../../test/testUseAdverts'
import { testAdvert } from '@alwaystudios/recipe-bible-sdk'

const getAdverts = jest.fn()
const deleteAdvert = jest.fn()
const adverts = [testAdvert(), testAdvert()]
jest
  .spyOn(useAdvertsModule, 'useAdverts')
  .mockImplementation(() => testUseAdverts({ getAdverts, deleteAdvert, adverts, loading: false }))

describe('manage adverts page', () => {
  it('renders with all current adverts', () => {
    render(<ManageAdvertsPage />)
    expect(screen.getAllByRole('iframe-mask').length).toBe(2)
  })

  it('handles on delete advert', () => {
    render(<ManageAdvertsPage />)
    const deleteAdvert1Cta = screen.getAllByRole('delete-advert-cta')[0]
    fireEvent.click(deleteAdvert1Cta)

    expect(deleteAdvert).toHaveBeenCalledTimes(1)
    expect(deleteAdvert).toHaveBeenCalledWith(adverts[0])
  })
})
