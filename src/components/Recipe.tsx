import { Tab, Tabs } from '@alwaystudios/as-ui-components'
import { Recipe as RecipeType } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React from 'react'
import { Ingredients } from './Ingredients'
import { Nutrition } from './Nutrition'
import { RecipeImage } from './RecipeImage'
import { RecipeInfo } from './RecipeInfo'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

type Props = {
  recipe: RecipeType
}

export const Recipe: React.FC<Props> = ({
  recipe: {
    servings,
    cookingTime,
    imgSrc,
    categories,
    title,
    story,
    youWillNeed,
    ingredients,
    nutrition: { fat, carbs, protein },
  },
}) => (
  <Container>
    <p>{title}</p>
    <p>{story}</p>
    <p>You will need: {youWillNeed}</p>
    <RecipeImage src={imgSrc} size="medium" />
    <RecipeInfo categories={categories} servings={servings} cookingTime={cookingTime} />
    <Tabs>
      <Tab title="Ingredients">
        <Ingredients ingredients={ingredients} />
      </Tab>
      <Tab title="Steps">
        <p>steps</p>
      </Tab>
      <Tab title="Nutrition">
        <Nutrition fat={fat} carbs={carbs} protein={protein} />
      </Tab>
    </Tabs>
  </Container>
)
