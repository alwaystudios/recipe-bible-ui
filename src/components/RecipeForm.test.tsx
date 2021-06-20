import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RecipeForm } from './RecipeForm'
import { testRecipe } from '@alwaystudios/recipe-bible-sdk'
import * as AuthContext from '../auth/AuthContext'
import * as assetUploadModule from '../domain/assetUpload'

const assetUpload = jest.spyOn(assetUploadModule, 'assetUpload')
const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')
const tokens = { idToken: '1234' }

const recipe = testRecipe({ imgSrc: '' })
const updateRecipe = jest.fn()
const saveRecipe = jest.fn()
const file = { content: 'content' }

describe('recipe form', () => {
  beforeEach(jest.clearAllMocks)

  it('renders', () => {
    render(<RecipeForm recipe={recipe} updateRecipe={updateRecipe} saveRecipe={saveRecipe} />)
    expect(screen.getByText('Photo')).toBeInTheDocument()
    expect(screen.getByText('Steps')).toBeInTheDocument()
  })

  it('handles photo upload', async () => {
    useAuthContext.mockReturnValue({ tokens } as any)
    saveRecipe.mockResolvedValueOnce(undefined)
    assetUpload.mockResolvedValueOnce('new-img-src')

    const { container } = render(
      <RecipeForm recipe={recipe} updateRecipe={updateRecipe} saveRecipe={saveRecipe} />
    )

    const input = container.querySelector('input')
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => expect(saveRecipe).toHaveBeenCalledTimes(1))
    expect(assetUpload).toHaveBeenCalledTimes(1)
    expect(assetUpload).toHaveBeenCalledWith({
      assetType: 'recipe',
      file: {
        content: 'content',
        path: undefined,
      },
      folder: `recipes/${recipe.title}`,
      token: '1234',
    })
    expect(updateRecipe).toHaveBeenCalledTimes(1)
  })
})
