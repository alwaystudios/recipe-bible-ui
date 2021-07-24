import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RecipeForm } from './RecipeForm'
import { testRecipe, toIngredientRecord, toSlug } from '@alwaystudios/recipe-bible-sdk'
import * as AuthContext from '../auth/AuthContext'
import * as assetUploadModule from '../domain/assetUpload'
import { lorem } from 'faker'
import { testAuthContext, testTokens } from '../../test/testAuthContext'

const saveIngredient = jest.fn().mockResolvedValue(undefined)
const ingredients = [lorem.words(2), lorem.words(2)].map(toIngredientRecord)

const push = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push,
  }),
}))

const assetUpload = jest.spyOn(assetUploadModule, 'assetUpload')
const useAuthContext = jest.spyOn(AuthContext, 'useAuthContext')
const tokens = testTokens({ idToken: '1234' })

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
    <RecipeForm
      recipe={_recipe}
      updateRecipe={updateRecipe}
      deleteRecipe={deleteRecipe}
      ingredients={ingredients}
      saveIngredient={saveIngredient}
    />
  )

describe('recipe form', () => {
  beforeEach(jest.clearAllMocks)

  it('renders', () => {
    renderForm()
    expect(screen.getByText('Photo')).toBeInTheDocument()
    expect(screen.getByText('Story')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Nutrition')).toBeInTheDocument()
    expect(screen.getByText('You will need')).toBeInTheDocument()
    expect(screen.getByText('Steps')).toBeInTheDocument()
    expect(screen.getByText('Ingredients')).toBeInTheDocument()
    expect(screen.getByText('Info')).toBeInTheDocument()
  })

  describe('CTAs', () => {
    it('handles delete CTA with confirmation', async () => {
      window.confirm = jest.fn(() => true)

      deleteRecipe.mockResolvedValueOnce(undefined)
      renderForm()
      fireEvent.click(screen.getByText('delete'))
      expect(deleteRecipe).toHaveBeenCalledTimes(1)
      expect(deleteRecipe).toHaveBeenCalledWith(toSlug(recipe.title))
      await waitFor(() => expect(push).toHaveBeenCalledTimes(1))
      expect(push).toHaveBeenCalledWith('/manage/recipes')
      expect(window.confirm).toBeCalled()
    })

    it('handles view CTA', () => {
      renderForm()
      fireEvent.click(screen.getByText('view'))
      expect(push).toHaveBeenCalledTimes(1)
      expect(push).toHaveBeenCalledWith(`/recipes/${toSlug(recipe.title)}`)
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
  })

  it('handles photo upload', async () => {
    useAuthContext.mockReturnValue(testAuthContext({ tokens }))
    assetUpload.mockResolvedValueOnce({ filename: 'new-img-src' })

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

  it('updates recipe story', () => {
    const { container } = renderForm(testRecipe({ story: 'my story' }))
    fireEvent.click(screen.getByText('Story'))

    const input = screen.getByDisplayValue('my story')
    fireEvent.change(input, { target: { value: 'my story update' } })

    const changeBtn = container.querySelector('svg')
    fireEvent.click(changeBtn)

    expect(updateRecipe).toHaveBeenCalledTimes(1)
    expect(updateRecipe).toHaveBeenCalledWith({ story: 'my story update' })
  })

  describe('categories', () => {
    it('adds a category', () => {
      renderForm(testRecipe({ categories: ['Meat'] }))
      fireEvent.click(screen.getByText('Categories'))

      fireEvent.click(screen.getByText('Chicken'))

      expect(updateRecipe).toHaveBeenCalledTimes(1)
      expect(updateRecipe).toHaveBeenCalledWith({ categories: ['Meat', 'Chicken'] })
    })

    it('removes a category', () => {
      renderForm(testRecipe({ categories: ['Chicken', 'Meat'] }))
      fireEvent.click(screen.getByText('Categories'))

      fireEvent.click(screen.getByText('Chicken'))

      expect(updateRecipe).toHaveBeenCalledTimes(1)
      expect(updateRecipe).toHaveBeenCalledWith({ categories: ['Meat'] })
    })
  })

  describe('nutrition', () => {
    test.each<[string]>([['fat'], ['protein'], ['carbs']])('updates %s', (nutrition: string) => {
      const { container } = renderForm()
      fireEvent.click(screen.getByText('Nutrition'))

      const input = screen.getByLabelText(nutrition)
      fireEvent.change(input, { target: { value: 'update' } })

      const changeBtn = container.querySelector('svg')
      fireEvent.click(changeBtn)

      expect(updateRecipe).toHaveBeenCalledTimes(1)
      expect(updateRecipe).toHaveBeenCalledWith({ nutrition: { [nutrition]: 'update' } })
    })
  })

  describe('info', () => {
    it('updates cooking time', () => {
      const { container } = renderForm()
      fireEvent.click(screen.getByText('Info'))

      const input = screen.getByLabelText('cooking time')
      fireEvent.change(input, { target: { value: '22' } })

      const changeBtn = container.querySelector('svg')
      fireEvent.click(changeBtn)

      expect(updateRecipe).toHaveBeenCalledTimes(1)
      expect(updateRecipe).toHaveBeenCalledWith({ cookingTime: '22' })
    })

    it('updates servings', () => {
      const { container } = renderForm()
      fireEvent.click(screen.getByText('Info'))

      const input = screen.getByLabelText('servings')
      fireEvent.change(input, { target: { value: '22' } })

      const changeBtn = container.querySelector('svg')
      fireEvent.click(changeBtn)

      expect(updateRecipe).toHaveBeenCalledTimes(1)
      expect(updateRecipe).toHaveBeenCalledWith({ servings: 22 })
    })
  })

  describe('you will need', () => {
    it('adds an item to the list', () => {
      renderForm(testRecipe({ youWillNeed: ['this'] }))
      fireEvent.click(screen.getByText('You will need'))

      const input = screen.getByRole('you-will-need')
      fireEvent.change(input, { target: { value: 'that' } })

      fireEvent.click(screen.getByText('add'))

      expect(updateRecipe).toHaveBeenCalledTimes(1)
      expect(updateRecipe).toHaveBeenCalledWith({ youWillNeed: ['this', 'that'] })
    })

    it('prevents duplicate adds to the list', () => {
      renderForm(testRecipe({ youWillNeed: ['this'] }))
      fireEvent.click(screen.getByText('You will need'))

      const input = screen.getByRole('you-will-need')
      fireEvent.change(input, { target: { value: 'this' } })

      fireEvent.click(screen.getByText('add'))

      expect(updateRecipe).toHaveBeenCalledTimes(1)
      expect(updateRecipe).toHaveBeenCalledWith({ youWillNeed: ['this'] })
    })

    it('removes an item from the list', () => {
      renderForm(testRecipe({ youWillNeed: ['this'] }))
      fireEvent.click(screen.getByText('You will need'))

      fireEvent.click(screen.getByText('this'))

      expect(updateRecipe).toHaveBeenCalledTimes(1)
      expect(updateRecipe).toHaveBeenCalledWith({ youWillNeed: [] })
    })
  })

  describe('steps', () => {
    it('handles adding a step', async () => {
      renderForm(testRecipe({ steps: [] }))
      fireEvent.click(screen.getByText('Steps'))

      const input = screen.getByRole('step-input')
      fireEvent.change(input, { target: { value: 'my new step' } })

      fireEvent.click(screen.getByText('Save'))

      expect(updateRecipe).toHaveBeenCalledTimes(1)
      expect(updateRecipe).toHaveBeenCalledWith({ steps: [{ step: 'my new step' }] })
    })
  })

  describe('ingredients', () => {
    it('handles adding an ingredient', () => {
      renderForm(testRecipe({ ingredients: [] }))
      fireEvent.click(screen.getByText('Ingredients'))

      fireEvent.change(screen.getByRole('ingredient-form-input'), {
        target: { value: ingredients[0] },
      })
      fireEvent.change(screen.getByRole('quantity-form-input'), { target: { value: '2' } })
      fireEvent.click(screen.getByText('save'))

      expect(updateRecipe).toHaveBeenCalledTimes(1)
      expect(updateRecipe).toHaveBeenCalledWith({
        ingredients: [{ name: ingredients[0], measure: 'qty', quantity: '2' }],
      })
    })
  })
})
