import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { IngredientAssetUploader } from './IngredientAssetUploader'
import { lorem } from 'faker'
import * as AuthContext from '../auth/AuthContext'
import * as assetUploadModule from '../domain/assetUpload'
import { toIngredientRecord } from '@alwaystudios/recipe-bible-sdk'
import { testAuthContext, testTokens } from '../../test/testAuthContext'

const push = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push,
  }),
}))

const setIngredientExists = jest.fn()
const ingredient = 'My new ingredient'

const setError = jest.fn()
const assetUpload = jest.spyOn(assetUploadModule, 'assetUpload')
const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')
const tokens = testTokens({ idToken: '1234' })
const file = { content: 'content' }

describe('ingredient asset uploader', () => {
  beforeEach(jest.clearAllMocks)

  it('uploads a new ingredient asset', async () => {
    useAuthContext.mockReturnValue(testAuthContext({ tokens }))
    const imgSrc = lorem.words(2)
    assetUpload.mockResolvedValueOnce({ filename: imgSrc })

    const { container } = render(
      <IngredientAssetUploader
        ingredient={ingredient}
        disabled={false}
        setIngredientExists={setIngredientExists}
        setError={setError}
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
    expect(push).not.toHaveBeenCalled()
  })

  it('handles errors when uploading a new ingredient asset', async () => {
    useAuthContext.mockReturnValue(testAuthContext({ tokens }))
    assetUpload.mockResolvedValueOnce({ error: true })

    const { container } = render(
      <IngredientAssetUploader
        ingredient={ingredient}
        disabled={false}
        setIngredientExists={setIngredientExists}
        setError={setError}
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
    expect(setIngredientExists).toHaveBeenCalledWith(false)
    expect(setError).toHaveBeenCalledTimes(2)
    expect(setError).toHaveBeenNthCalledWith(1, false)
    expect(setError).toHaveBeenNthCalledWith(2, true)
    expect(push).not.toHaveBeenCalled()
  })

  it('redirects to /account on auth error', async () => {
    useAuthContext.mockReturnValue(testAuthContext({ tokens }))
    assetUpload.mockResolvedValueOnce({ authError: true })

    const { container } = render(
      <IngredientAssetUploader
        ingredient={ingredient}
        disabled={false}
        setIngredientExists={setIngredientExists}
        setError={setError}
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
    expect(setIngredientExists).toHaveBeenCalledWith(false)
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith(`/account`)
  })

  it('prevents upload', () => {
    useAuthContext.mockReturnValue(testAuthContext({ tokens }))
    const imgSrc = lorem.words(2)
    assetUpload.mockResolvedValueOnce({ filename: imgSrc })

    render(
      <IngredientAssetUploader
        ingredient={''}
        disabled={false}
        setIngredientExists={setIngredientExists}
        setError={setError}
      />
    )

    fireEvent.click(screen.getByText('upload'))
    expect(setIngredientExists).not.toHaveBeenCalled()
  })
})
