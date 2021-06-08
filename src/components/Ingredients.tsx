import styled from '@emotion/styled'
import React from 'react'
import { AWS_S3_BUCKET } from '../contstants'
import { Ingredient } from './Ingredient'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const getImgSrc = (ingredient: string): string => `${AWS_S3_BUCKET}/ingredients/${ingredient}.jpg`

type Props = {
  ingredients: string[]
  // eslint-disable-next-line no-unused-vars
  onDelete?: (ingredient: string) => void
}

export const Ingredients: React.FC<Props> = ({ ingredients, children, onDelete }) => (
  <Container>
    {children}
    {ingredients.map((name) => (
      <Ingredient label={name} imgSrc={getImgSrc(name)} key={name} onDelete={onDelete} />
    ))}
  </Container>
)
