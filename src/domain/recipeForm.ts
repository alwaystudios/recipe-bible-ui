import { toIngredientRecord, truthy } from '@alwaystudios/recipe-bible-sdk'

export const ingredientExists = (ingredient: string, ingredients: string[]): boolean =>
  ingredients.includes(toIngredientRecord(ingredient))

export const updateArrayUnq = <T>(newValue: T, values: T[]): T[] =>
  Array.from(new Set([...values, newValue])).filter(truthy)

export const removeFromArray = <T extends string>(value: T, values: T[]): T[] =>
  values.filter((v) => v !== value)

export const removeObjectFromArray = <T>(value: T, values: T[], prop: keyof T): T[] =>
  values.filter((v) => v[prop] !== value[prop])
