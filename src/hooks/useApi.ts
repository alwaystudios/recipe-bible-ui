import request from 'superagent'
import { path } from 'ramda'
import { kebabify } from '@alwaystudios/as-utils/dist/strings'
import { Recipe } from '@alwaystudios/recipe-bible-sdk'

type StatusMethod = 'getMyPublishedRecipes' | 'getMyDraftRecipes' | 'getMyReviewedRecipes'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useApi = () => {
  const getSystemState = () =>
    request.get(`/api/system`).then((res) => {
      return res.text
    })

  const getIngredient = (name: string) =>
    request
      .get(`/api/ingredients/${name}`)
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })

  const searchIngredients = (search: string) =>
    request.get(`/api/ingredients/search/${search}`).then((res) => {
      return res.body
    })

  const saveIngredient = (label: string) =>
    request
      .post('/api/ingredients')
      .send({ label })
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })

  const publishRecipe = (id: number) =>
    request
      .get(`/api/recipes/publish/${id}`)
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })

  const unpublishRecipe = (id: number) =>
    request
      .get(`/api/recipes/unpublish/${id}`)
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })

  const saveRecipe = (recipe: Recipe) =>
    request
      .put(`/api/recipes/${recipe.title}`)
      .send(recipe)
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })

  const createRecipe = (title: string, imgSrc: string) =>
    request
      .post('/api/recipes')
      .send({ title, imgSrc })
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })

  const getRecipesByCategory = (category: string): Promise<Recipe[]> =>
    request
      .get(`/api/recipes/category/${category}`)
      .then((res) => {
        return res.body as Recipe[]
      })
      .catch(() => {
        return []
      })

  const getChefsRecipesByCategory = (name: string, category: string): Promise<Recipe[]> =>
    request
      .get(`/api/recipes/category/${category}?chef=${kebabify(name)}`)
      .then((res) => {
        return res.body as Recipe[]
      })
      .catch(() => {
        return []
      })

  const getMyRecipes = (): Promise<Recipe[]> =>
    request
      .get(`/api/account/recipes`)
      .then((res) => {
        return res.body as Recipe[]
      })
      .catch(() => {
        return []
      })

  const getMyRecipesByStatus = (status: StatusMethod): Promise<Recipe[]> =>
    request
      .get(`/api/account/recipes/${status}`)
      .then((res) => {
        return res.body as Recipe[]
      })
      .catch(() => {
        return []
      })

  const recipeExists = (name: string): Promise<boolean> =>
    request.get(`/api/recipes/check/${name}`).then((res) => {
      return res.text === 'true'
    })

  const rateRecipe = (id: number, rating: number) =>
    request
      .post(`/api/recipes/rate/${id}`)
      .send({ rating })
      .then((res) => {
        return path(['body', 'rating'], res)
      })

  return {
    searchIngredients,
    getIngredient,
    saveIngredient,
    createRecipe,
    saveRecipe,
    publishRecipe,
    unpublishRecipe,
    getRecipesByCategory,
    getMyRecipesByStatus,
    getMyRecipes,
    recipeExists,
    getSystemState,
    getChefsRecipesByCategory,
    rateRecipe,
  }
}
