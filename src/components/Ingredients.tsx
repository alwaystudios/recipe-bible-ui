import { Ingredient as IngredientType } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React from 'react'
import { Ingredient } from './Ingredient'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

type Props = {
  ingredients: IngredientType[]
  // eslint-disable-next-line no-unused-vars
  onDelete?: (ingredient: string) => void
}

export const Ingredients: React.FC<Props> = ({ ingredients, children, onDelete }) => (
  <Container>
    {children}
    {ingredients.map(({ name, imgSrc }) => (
      <Ingredient label={name} imgSrc={imgSrc} key={name} onDelete={onDelete} />
    ))}
  </Container>
)
