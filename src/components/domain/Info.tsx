import React from 'react'
import { Servings } from './Servings'
import { CookingTime } from './CookingTime'
import styled from 'styled-components'
import { Categories } from './Categories'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
`

type ComponentProps = {
  servings: number
  cookingTime: string
  categories: string[]
}

export const Info: React.FunctionComponent<ComponentProps> = ({
  servings,
  cookingTime,
  categories,
}) => (
  <Container>
    <div className="flex-row" style={{ alignItems: 'flex-start', width: '100%' }}>
      <Servings servings={servings} />
      <CookingTime cookingTime={cookingTime} />
    </div>
    <div className="flex-row" style={{ alignItems: 'flex-start', width: '100%' }}>
      <Categories categories={categories} />
    </div>
  </Container>
)
