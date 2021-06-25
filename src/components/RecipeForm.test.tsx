import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RecipeForm } from './RecipeForm'
import { testRecipe, toSlug } from '@alwaystudios/recipe-bible-sdk'
import * as AuthContext from '../auth/AuthContext'
import * as assetUploadModule from '../domain/assetUpload'

const assetUpload = jest.spyOn(assetUploadModule, 'assetUpload')
const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')
const tokens = { idToken: '1234' }

const recipe = testRecipe({ imgSrc: '' })
const updateRecipe = jest.fn()
const file = { content: 'content' }

describe('recipe form', () => {
  beforeEach(jest.clearAllMocks)

  it('renders', () => {
    render(<RecipeForm recipe={recipe} updateRecipe={updateRecipe} />)
    expect(screen.getByText('Photo')).toBeInTheDocument()
    expect(screen.getByText('Steps')).toBeInTheDocument()
  })

  it('handles photo upload', async () => {
    useAuthContext.mockReturnValue({ tokens } as any)
    assetUpload.mockResolvedValueOnce('new-img-src')

    const { container } = render(<RecipeForm recipe={recipe} updateRecipe={updateRecipe} />)

    const input = container.querySelector('input')
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => expect(assetUpload).toHaveBeenCalledTimes(1))
    expect(assetUpload).toHaveBeenCalledWith({
      assetType: 'recipe',
      file: {
        content: 'content',
        path: undefined,
      },
      folder: `recipes/${toSlug(recipe.title)}`,
      token: '1234',
    })
    expect(updateRecipe).toHaveBeenCalledTimes(1)
  })
})
