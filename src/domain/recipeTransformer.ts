import {
  getSlug,
  Ingredient,
  Recipe,
  recipeTitleTransformer,
  Step,
  toIngredientRecord,
  toSlug,
} from '@alwaystudios/recipe-bible-sdk'
import { AWS_S3_BUCKET } from '../constants'

const EMPTY_RECIPE: Recipe = {
  imgSrc: '',
  title: '',
  story: '',
  categories: [],
  ingredients: [],
  steps: [],
  metadata: {
    focused: false,
    published: false,
  },
  ratings: [],
  cookingTime: '',
  prepTime: '',
  youWillNeed: [],
  servings: 0,
  nutrition: {},
}

export const getIngredientImgSrc = (ingredient: string): string =>
  `${AWS_S3_BUCKET}/ingredients/${ingredient}.jpg`

export const getRecipeImgSrc = (title: string, imgSrc: string): string | undefined =>
  imgSrc ? `${AWS_S3_BUCKET}/recipes/${title}/${imgSrc}` : undefined

export const fromRecipeApi = (recipe: Partial<Recipe>): Recipe => {
  const title = recipeTitleTransformer(recipe.title)
  const imgSrc = getRecipeImgSrc(recipe.title, recipe.imgSrc)
  const ingredients: Ingredient[] = (recipe.ingredients || []).map((i) => ({
    ...i,
    name: i.name,
    imgSrc: getIngredientImgSrc(i.name),
  }))
  const steps: Step[] = (recipe.steps || []).map((s) => ({
    ...s,
    imgSrc: getRecipeImgSrc(recipe.title, s.imgSrc),
  }))

  return { ...EMPTY_RECIPE, ...recipe, imgSrc, ingredients, steps, title }
}

type RecipeSummaryCardProps = {
  title: string
  imgSrc: string
  onClick: () => void
}

export const fromRecipesApi = (
  recipes: Partial<Recipe[]>,
  historyPush: (url: string) => void,
  mode: 'view' | 'edit'
): RecipeSummaryCardProps[] =>
  recipes.map(({ title, imgSrc, categories }) => {
    const _title = toSlug(title)
    return {
      title: recipeTitleTransformer(title),
      imgSrc: getRecipeImgSrc(title, imgSrc),
      categories: categories || [],
      onClick: () => historyPush(`/${mode === 'view' ? 'recipes' : 'manage/recipes'}/${_title}`),
    }
  })

export const toStepsApi = (steps: Step[]): Step[] =>
  steps.map(({ imgSrc, step }) => ({
    imgSrc: imgSrc ? getSlug(imgSrc) : undefined,
    step,
  }))

export const toIngredientsApi = (ingredients: Ingredient[]): Ingredient[] =>
  ingredients.map(({ name, quantity, measure }) => ({
    name: toIngredientRecord(name),
    quantity,
    measure,
  }))
