import React from 'react'
import styled from 'styled-components'
// import { Ingredient } from './Ingredient'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

type ComponentProps = {
  // ingredients: IngredientType[]
  onDelete?: (ingredient: string) => void
  className?: string
}

export const Ingredients: React.FunctionComponent<ComponentProps> = ({
  // ingredients,
  children,
  // onDelete,
  className = '',
}) => {
  return (
    <Container className={className}>
      {children}
      {/* {ingredients.map((i, index) => (
        <Ingredient
          link={i.link}
          label={i.label}
          imgSrc={i.imgSrc}
          key={index}
          onDelete={onDelete}
        />
      ))} */}
    </Container>
  )
}
