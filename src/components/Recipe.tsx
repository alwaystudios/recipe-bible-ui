import { Recipe as RecipeType } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React from 'react'
import { RecipeImage } from './RecipeImage'
import { RecipeInfo } from './RecipeInfo'

const Container = styled.div``

type Props = {
  recipe: RecipeType
}

// todo: complete view and unit tests
export const Recipe: React.FC<Props> = ({
  recipe: { servings, cookingTime, imgSrc, categories },
}) => (
  <Container>
    <RecipeImage src={imgSrc} size="medium" />
    <RecipeInfo categories={categories} servings={servings} cookingTime={cookingTime} />
  </Container>
)
