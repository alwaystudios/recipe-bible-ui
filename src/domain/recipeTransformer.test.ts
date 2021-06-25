import { dekebabify, recipeTitleTransformer, testRecipe } from '@alwaystudios/recipe-bible-sdk'
import { fromRecipeApi, fromRecipesApi, getRecipeImgSrc } from './recipeTransformer'

const recipe = testRecipe()

describe('recipe transformers', () => {
  describe('getRecipeImgSrc', () => {
    it('returns a valid url', () => {
      expect(getRecipeImgSrc(recipe.title, recipe.imgSrc)).toEqual(
        `http://localhost:4566/recipe-bible-content/recipes/${recipe.title}/${recipe.imgSrc}`
      )
    })
    it('returns undefined when no img src', () => {
      expect(getRecipeImgSrc(recipe.title, '')).toBeUndefined()
    })
  })

  describe('fromRecipeApi', () => {
    it('transforms a complete recipe', () => {
      expect(fromRecipeApi(recipe)).toEqual({
        ...recipe,
        title: recipeTitleTransformer(recipe.title),
        imgSrc: `http://localhost:4566/recipe-bible-content/recipes/${recipe.title}/${recipe.imgSrc}`,
        ingredients: recipe.ingredients.map((i) => ({
          ...i,
          imgSrc: `http://localhost:4566/recipe-bible-content/ingredients/${i.name}.jpg`,
          name: dekebabify(i.name),
        })),
        steps: recipe.steps.map((s) => ({
          ...s,
          imgSrc: `http://localhost:4566/recipe-bible-content/recipes/${recipe.title}/${s.imgSrc}`,
        })),
      })
    })

    it('transforms a partial recipe', () => {
      const title = 'My new recipe'
      expect(fromRecipeApi({ title })).toEqual({
        categories: [],
        cookingTime: '',
        imgSrc: undefined,
        ingredients: [],
        metadata: {
          focused: false,
          published: false,
        },
        nutrition: {},
        prepTime: '',
        ratings: [],
        servings: 0,
        steps: [],
        story: '',
        title: 'My new recipe',
        youWillNeed: [],
      })
    })
  })

  describe('fromRecipesApi', () => {
    test.each([['view'], ['edit']])('mode = $s', (mode: any) => {
      const historyPush = jest.fn()
      const recipes = [testRecipe(), testRecipe()]
      const data = fromRecipesApi(recipes, historyPush, mode)
      expect(data).toEqual(
        recipes.map((r) => ({
          title: recipeTitleTransformer(r.title),
          imgSrc: getRecipeImgSrc(r.title, r.imgSrc),
          onClick: expect.anything(),
        }))
      )
      data[0].onClick()
      expect(historyPush).toHaveBeenCalledTimes(1)
      const segment = mode === 'view' ? 'recipes' : 'manage/recipes'
      expect(historyPush).toHaveBeenCalledWith(`/${segment}/${recipes[0].title}`)
    })
  })
})
