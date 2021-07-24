import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { StepForm } from './StepForm'
import { datatype, lorem } from 'faker'
import * as AuthContext from '../auth/AuthContext'
import * as assetUploadModule from '../domain/assetUpload'
import { toSlug } from '@alwaystudios/recipe-bible-sdk'
import { testAuthContext, testTokens } from '../../test/testAuthContext'

const saveStep = jest.fn()
const nextStepIndex = datatype.number()
const recipeTitle = lorem.word()

const assetUpload = jest.spyOn(assetUploadModule, 'assetUpload')
const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')
const tokens = testTokens({ idToken: '1234' })
const file = { content: 'content' }

describe('step form', () => {
  beforeEach(jest.clearAllMocks)

  it('adds a step without an image', () => {
    render(<StepForm saveStep={saveStep} nextStepIndex={nextStepIndex} recipeTitle={recipeTitle} />)

    const value = lorem.words(5)
    const input = screen.getByRole('step-input')
    fireEvent.change(input, { target: { value } })

    expect(screen.getByDisplayValue(value)).toBeInTheDocument()

    fireEvent.click(screen.getByText('Save'))
    expect(saveStep).toHaveBeenCalledTimes(1)
    expect(saveStep).toHaveBeenCalledWith({ step: value, imgSrc: '' })
  })

  it('adds a step with an image', async () => {
    useAuthContext.mockReturnValue(testAuthContext({ tokens }))
    const imgSrc = lorem.words(2)
    assetUpload.mockResolvedValueOnce({ filename: imgSrc })

    const { container } = render(
      <StepForm saveStep={saveStep} nextStepIndex={nextStepIndex} recipeTitle={recipeTitle} />
    )

    const value = lorem.words(5)
    const stepInput = screen.getByRole('step-input')
    fireEvent.change(stepInput, { target: { value } })

    expect(screen.getByDisplayValue(value)).toBeInTheDocument()

    const fileInput = container.querySelector('input')
    fireEvent.change(fileInput, { target: { files: [file] } })

    await waitFor(() => expect(assetUpload).toHaveBeenCalledTimes(1))
    expect(assetUpload).toHaveBeenCalledWith({
      assetType: 'step',
      file: {
        content: 'content',
        path: undefined,
      },
      folder: `recipes/${toSlug(recipeTitle)}`,
      token: '1234',
    })

    fireEvent.click(screen.getByText('Save'))
    expect(saveStep).toHaveBeenCalledTimes(1)
    expect(saveStep).toHaveBeenCalledWith({ step: value, imgSrc })
  })
})
