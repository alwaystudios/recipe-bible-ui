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

const recipe = testRecipe({
  imgSrc: '',
  title: lorem.words(3),
  metadata: { published: false, focused: false },
})
const updateRecipe = jest.fn()
const deleteRecipe = jest.fn()
const file = { content: 'content' }

const renderForm = (_recipe = recipe) =>
  render(
    <Router>
      <RecipeForm recipe={_recipe} updateRecipe={updateRecipe} deleteRecipe={deleteRecipe} />
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

    expect(screen.queryByText('focus')).not.toBeInTheDocument()
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

  it('handles publish CTA', () => {
    updateRecipe.mockResolvedValueOnce(undefined)
    renderForm()
    fireEvent.click(screen.getByText('publish'))
    expect(updateRecipe).toHaveBeenCalledTimes(1)
    expect(updateRecipe).toHaveBeenCalledWith({ metadata: { published: true } })
  })

  it('handles unpublish CTA', () => {
    updateRecipe.mockResolvedValueOnce(undefined)
    renderForm(testRecipe({ metadata: { published: true, focused: false } }))
    fireEvent.click(screen.getByText('unpublish'))
    expect(updateRecipe).toHaveBeenCalledTimes(1)
    expect(updateRecipe).toHaveBeenCalledWith({ metadata: { published: false } })
  })

  it('prevents unpublish CTA when already focused', () => {
    updateRecipe.mockResolvedValueOnce(undefined)
    renderForm(testRecipe({ metadata: { published: true, focused: true } }))
    fireEvent.click(screen.getByText('unpublish'))
    expect(updateRecipe).not.toHaveBeenCalled()
  })

  it('handles focus CTA', () => {
    updateRecipe.mockResolvedValueOnce(undefined)
    renderForm(testRecipe({ metadata: { published: true, focused: false } }))
    fireEvent.click(screen.getByText('focus'))
    expect(updateRecipe).toHaveBeenCalledTimes(1)
    expect(updateRecipe).toHaveBeenCalledWith({ metadata: { focused: true } })
  })

  it('handles unfocus CTA', () => {
    updateRecipe.mockResolvedValueOnce(undefined)
    renderForm(testRecipe({ metadata: { published: true, focused: true } }))
    fireEvent.click(screen.getByText('unfocus'))
    expect(updateRecipe).toHaveBeenCalledTimes(1)
    expect(updateRecipe).toHaveBeenCalledWith({ metadata: { focused: false } })
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
