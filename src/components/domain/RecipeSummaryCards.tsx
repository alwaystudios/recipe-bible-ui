import { RecipeList } from '@alwaystudios/recipe-bible-sdk'
import React from 'react'
import styled from 'styled-components'
import { smallScreen } from '../../config'
import { RecipeSummaryCard } from './RecipeSummaryCard'

const Container = styled.div`
  justify-content: center;
  margin-top: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
  width: 100%;

  @media only screen and (max-width: ${smallScreen}px) {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
`

type ComponentProps = {
  recipes: RecipeList | null
}

export const RecipeSummaryCards: React.FunctionComponent<ComponentProps> = ({ recipes }) => {
  return (
    <Container className="flex-row">
      {recipes ? (
        <>
          {recipes.map(({ title, imgSrc }) => (
            <RecipeSummaryCard key={title} title={title} imgSrc={imgSrc} />
          ))}
          {recipes.length === 0 && <p>No recipes found</p>}
        </>
      ) : (
        <></>
      )}
    </Container>
  )
}
