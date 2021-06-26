import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RecipeForm } from './RecipeForm'
import { testRecipe, toSlug } from '@alwaystudios/recipe-bible-sdk'
import * as AuthContext from '../auth/AuthContext'
import * as assetUploadModule from '../domain/assetUpload'
import { MemoryRouter as Router } from 'react-router-dom'
import { lorem } from 'faker'

const push = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push,
  }),
}))

const assetUpload = jest.spyOn(assetUploadModule, 'assetUpload')
const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')
const tokens = { idToken: '1234' }

const recipe = testRecipe({ imgSrc: '', title: lorem.words(3) })
const updateRecipe = jest.fn()
const deleteRecipe = jest.fn()
const file = { content: 'content' }

const renderForm = () =>
  render(
    <Router>
      <RecipeForm recipe={recipe} updateRecipe={updateRecipe} deleteRecipe={deleteRecipe} />
    </Router>
  )

describe('recipe form', () => {
  beforeEach(jest.clearAllMocks)

  it('renders', () => {
    renderForm()
    expect(screen.getByText('Photo')).toBeInTheDocument()
    expect(screen.getByText('Steps')).toBeInTheDocument()

    const viewLink = screen.getByText('view')
    expect(viewLink).toBeInTheDocument()
    expect(viewLink.getAttribute('href')).toBe(`/recipes/${toSlug(recipe.title)}`)

    expect(screen.getByText('recipes')).toBeInTheDocument()
    expect(screen.getByText('manage recipes')).toBeInTheDocument()
  })

  it('handles delete CTA', async () => {
    deleteRecipe.mockResolvedValueOnce(undefined)
    renderForm()
    fireEvent.click(screen.getByText('delete'))
    expect(deleteRecipe).toHaveBeenCalledTimes(1)
    expect(deleteRecipe).toHaveBeenCalledWith(toSlug(recipe.title))
    await waitFor(() => expect(push).toHaveBeenCalledTimes(1))
    expect(push).toHaveBeenCalledWith('/manage/recipes')
  })

  it('handles photo upload', async () => {
    useAuthContext.mockReturnValue({ tokens } as any)
    assetUpload.mockResolvedValueOnce('new-img-src')

    const { container } = renderForm()

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
