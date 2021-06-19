import React from 'react'
import { Servings } from './Servings'
import { CookingTime } from './CookingTime'
import { Categories } from './Categories'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`

type ComponentProps = {
  servings: number
  cookingTime: string
  categories: string[]
}

export const RecipeInfo: React.FunctionComponent<ComponentProps> = ({
  servings,
  cookingTime,
  categories,
}) => (
  <Container>
    <Row>
      {servings > 0 && <Servings servings={servings} />}
      {cookingTime && <CookingTime cookingTime={cookingTime} />}
    </Row>
    <Row>
      <Categories categories={categories} />
    </Row>
  </Container>
)
