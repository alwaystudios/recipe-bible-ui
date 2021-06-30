import { Ingredient as IngredientType } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React from 'react'
import { Ingredient } from './Ingredient'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

type ComponentProps = {
  ingredients: IngredientType[]
  onDelete?: (ingredient: string) => void
  className?: string
}

export const Ingredients: React.FunctionComponent<ComponentProps> = ({
  ingredients,
  children,
  onDelete,
}) => (
  <Container>
    {children}
    {ingredients.map((i, index) => (
      <Ingredient ingredient={i} key={index} onDelete={onDelete} />
    ))}
  </Container>
)
