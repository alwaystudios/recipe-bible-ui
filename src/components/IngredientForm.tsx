import { Button, TextInput } from '@alwaystudios/as-ui-components'
import {
  Ingredient,
  MAX_INGREDIENTS,
  Measure,
  Measures,
  toIngredientRecord,
} from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { IngredientFormSearch } from './IngredientFormSearch'
import { IngredientAssetUploader } from './IngredientAssetUploader'
import Select from 'react-select'
import { ingredientExists as ingredientExistsFnc } from '../domain/recipeForm'

const Container = styled.div`
  padding: 1rem 0 0 1rem;
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  min-height: 50vh;
`

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const MeasureInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  .text-input {
    width: 6.4rem;
  }

  .dropdown-input {
    width: 6.5rem;
  }
`

type Props = {
  saveIngredient: (ingredient: Ingredient) => void
  totalIngredients: number
  ingredients: string[]
}

type DropDownMeasure = {
  value: Measure
  label: Measure
}

const toDropDownMeasure = (measure: Measure): DropDownMeasure => ({
  value: measure,
  label: measure,
})

export const IngredientForm: React.FC<Props> = ({
  saveIngredient,
  totalIngredients,
  ingredients,
}) => {
  const [ingredient, setIngredient] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')
  const [measure, setMeasure] = useState<DropDownMeasure>(toDropDownMeasure('qty'))
  const [ingredientExists, setIngredientExists] = useState(false)
  const _measures = Measures.map(toDropDownMeasure)

  useEffect(() => {
    setIngredientExists(ingredientExistsFnc(ingredient, ingredients))
  }, [ingredient])

  const maxIngredients = totalIngredients === MAX_INGREDIENTS
  const saveButtonDisabled = !ingredient || !quantity || maxIngredients

  return (
    <Container>
      <TextInputContainer>
        <IngredientFormSearch
          value={ingredient}
          setValue={setIngredient}
          disabled={maxIngredients}
          ingredients={ingredients}
        />
        {ingredientExists ? (
          <Button
            text="save"
            isSubmit={false}
            disabled={saveButtonDisabled}
            onClick={() => {
              saveIngredient({
                name: toIngredientRecord(ingredient),
                quantity,
                measure: measure.label,
              })
              setIngredient('')
              setQuantity('')
            }}
          />
        ) : (
          <IngredientAssetUploader
            ingredient={ingredient}
            disabled={ingredientExists}
            setIngredientExists={setIngredientExists}
          />
        )}
      </TextInputContainer>
      <MeasureInputContainer>
        <TextInput
          placeholder="quantity"
          role="quantity-form-input"
          required={true}
          value={quantity}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setQuantity(event.currentTarget.value)
          }
          disabled={maxIngredients}
        />
        <Select
          className="dropdown-input"
          role="measure-form-dropdown"
          options={_measures}
          isDisabled={maxIngredients}
          onChange={({ value }) => setMeasure(toDropDownMeasure(value))}
          defaultValue={measure}
        />
      </MeasureInputContainer>
    </Container>
  )
}
