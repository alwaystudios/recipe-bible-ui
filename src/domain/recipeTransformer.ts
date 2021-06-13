import {
  dekebabify,
  Ingredient,
  kebabify,
  Recipe,
  recipeTitleTransformer,
  Step,
} from '@alwaystudios/recipe-bible-sdk'
import { AWS_S3_BUCKET } from '../contstants'

const getIngredientImgSrc = (ingredient: string): string =>
  `${AWS_S3_BUCKET}/ingredients/${ingredient}.jpg`

export const getRecipeImgSrc = (title: string, imgSrc: string): string | undefined =>
  imgSrc ? `${AWS_S3_BUCKET}/recipes/${title}/${imgSrc}` : undefined

export const fromRecipeApi = (recipe: Recipe): Recipe => {
  const title = recipeTitleTransformer(recipe.title)
  const imgSrc = getRecipeImgSrc(recipe.title, recipe.imgSrc)
  const ingredients: Ingredient[] = recipe.ingredients.map((i) => ({
    ...i,
    name: dekebabify(i.name),
    imgSrc: getIngredientImgSrc(i.name),
  }))
  const steps: Step[] = recipe.steps.map((s) => ({
    ...s,
    imgSrc: getRecipeImgSrc(recipe.title, s.imgSrc),
  }))

  return { ...recipe, imgSrc, ingredients, steps, title }
}

type RecipeSummaryCardProps = {
  title: string
  imgSrc: string
  onClick: () => void
}

export const fromRecipesApi = (
  recipes: Partial<Recipe[]>,
  historyPush: (url: string) => void // eslint-disable-line no-unused-vars
): RecipeSummaryCardProps[] =>
  recipes.map(({ title, imgSrc }) => {
    const _title = kebabify(title)
    return {
      title: recipeTitleTransformer(title),
      imgSrc: getRecipeImgSrc(title, imgSrc),
      onClick: () => historyPush(`/recipes/${_title}`),
    }
  })
