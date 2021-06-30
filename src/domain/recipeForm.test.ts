import { lorem } from 'faker'
import {
  ingredientExists,
  removeFromArray,
  removeObjectFromArray,
  updateArrayUnq,
} from './recipeForm'

describe('form utils', () => {
  describe('ingredient exists', () => {
    it('returns true if an unformated ingredient exists in the list of API formated ingredients', () => {
      const ingredient = '   HARD boiled eggs   '
      const ingredients = [...[...Array(10)].map(() => lorem.word()), 'hard-boiled-egg']
      expect(ingredientExists(ingredient, ingredients)).toBeTruthy()
    })

    it('returns false if an unformated ingredient does not exist in the list of API formated ingredients', () => {
      const ingredient = '   HARD boiled eggs   '
      const ingredients = [...[...Array(10)].map(() => lorem.word())]
      expect(ingredientExists(ingredient, ingredients)).toBeFalsy()
    })
  })

  describe('updateArrayUnq', () => {
    it('adds a non duplicate item to an array', () => {
      const value = 'new value'
      const values = [...Array(10)].map(() => lorem.words(2))

      expect(updateArrayUnq(value, values)).toEqual([...values, value])
    })

    it('ignores a duplicate item added to an array', () => {
      const value = 'new value'
      const values = [...[...Array(10)].map(() => lorem.words(2)), value]

      expect(updateArrayUnq(value, values)).toEqual(values)
    })

    it('ignores a falsy value added to an array', () => {
      const value = ''
      const values = [...Array(10)].map(() => lorem.words(2))

      expect(updateArrayUnq(value, values)).toEqual(values)
    })
  })

  describe('remove from array', () => {
    it('removes an existing value from an array', () => {
      const value = 'existing value'
      const baseValues = [...Array(10)].map(() => lorem.words(2))
      const values = [...baseValues, value]

      expect(removeFromArray(value, values)).toEqual(baseValues)
    })

    it('ignores a non existing value removed from an array', () => {
      const values = [...Array(10)].map(() => lorem.words(2))

      expect(removeFromArray('some value', values)).toEqual(values)
    })
  })

  describe('remove object from array', () => {
    interface Obj {
      key: number
      value?: string
    }

    const obj1: Obj = {
      key: 1,
      value: '1',
    }
    const obj2: Obj = {
      key: 2,
      value: '2',
    }
    const values = [obj1, obj2]

    test.each<[Obj, keyof Obj, Obj[]]>([
      [obj1, 'key', [obj2]],
      [obj2, 'value', [obj1]],
      [{ key: 3 }, 'value', values],
    ])('removes an object from an array', (value, key, result) => {
      expect(removeObjectFromArray(value, values, key)).toEqual(result)
    })
  })
})
