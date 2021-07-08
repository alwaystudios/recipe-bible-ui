import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { IngredientAssetUploader } from './IngredientAssetUploader'
import { lorem } from 'faker'
import * as AuthContext from '../auth/AuthContext'
import * as assetUploadModule from '../domain/assetUpload'
import { toIngredientRecord } from '@alwaystudios/recipe-bible-sdk'
import { testAuthContext, testTokens } from '../../test/testAuthContext'

const setIngredientExists = jest.fn()
const ingredient = 'My new ingredient'

const assetUpload = jest.spyOn(assetUploadModule, 'assetUpload')
const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')
const tokens = testTokens({ idToken: '1234' })
const file = { content: 'content' }

describe('ingredient asset uploader', () => {
  beforeEach(jest.clearAllMocks)

  it('uploads a new ingredient asset', async () => {
    useAuthContext.mockReturnValue(testAuthContext({ tokens }))
    const imgSrc = lorem.words(2)
    assetUpload.mockResolvedValueOnce(imgSrc)

    const { container } = render(
      <IngredientAssetUploader
        ingredient={ingredient}
        disabled={false}
        setIngredientExists={setIngredientExists}
      />
    )

    const fileInput = container.querySelector('input')
    fireEvent.change(fileInput, { target: { files: [file] } })

    await waitFor(() => expect(assetUpload).toHaveBeenCalledTimes(1))
    expect(assetUpload).toHaveBeenCalledWith({
      filenameOverride: `${toIngredientRecord(ingredient)}.jpg`,
      assetType: 'ingredient',
      file: {
        content: 'content',
        path: undefined,
      },
      folder: 'ingredients',
      token: '1234',
    })

    fireEvent.click(screen.getByText('upload'))
    expect(setIngredientExists).toHaveBeenCalledTimes(1)
    expect(setIngredientExists).toHaveBeenCalledWith(true)
  })

  it('prevents upload', () => {
    useAuthContext.mockReturnValue(testAuthContext({ tokens }))
    const imgSrc = lorem.words(2)
    assetUpload.mockResolvedValueOnce(imgSrc)

    render(
      <IngredientAssetUploader
        ingredient={''}
        disabled={false}
        setIngredientExists={setIngredientExists}
      />
    )

    fireEvent.click(screen.getByText('upload'))
    expect(setIngredientExists).not.toHaveBeenCalled()
  })
})
