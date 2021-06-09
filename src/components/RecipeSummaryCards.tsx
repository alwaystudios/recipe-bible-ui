import styled from '@emotion/styled'
import React from 'react'
import { RecipeSummaryCard } from './RecipeSummaryCard'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`

type Props = {
  recipeList: RecipeList
}

export const RecipeSummaryCards: React.FC<Props> = ({ recipeList = [] }) => (
  <Container>
    {recipeList.map(({ title, imgSrc, onClick }, index) => (
      <RecipeSummaryCard key={index} title={title} imgSrc={imgSrc} onClick={onClick} />
    ))}
    {recipeList.length === 0 && <p>No recipes found</p>}
  </Container>
)
