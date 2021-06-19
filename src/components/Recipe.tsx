import { Tab, Tabs } from '@alwaystudios/as-ui-components'
import { Recipe as RecipeType } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React from 'react'
import { Ingredients } from './Ingredients'
import { Nutrition } from './Nutrition'
import { RecipeImage } from './RecipeImage'
import { RecipeInfo } from './RecipeInfo'
import { Steps } from './Steps'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 90%;
  padding-left: 2rem;
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
    steps,
    nutrition: { fat, carbs, protein },
  },
}) => (
  <Container>
    <h1>{title}</h1>
    <p>{story}</p>
    {youWillNeed.length > 0 && <p>You will need: {youWillNeed}</p>}
    <RecipeContainer>
      <div>
        <RecipeImage src={imgSrc} size="medium" />
        <RecipeInfo categories={categories} servings={servings} cookingTime={cookingTime} />
      </div>
      <TabsContainer>
        <Tabs>
          <Tab title="Ingredients">
            <Ingredients ingredients={ingredients} />
          </Tab>
          <Tab title="Steps">
            <Steps steps={steps} />
          </Tab>
          {(fat || carbs || protein) && (
            <Tab title="Nutrition">
              <Nutrition fat={fat} carbs={carbs} protein={protein} />
            </Tab>
          )}
        </Tabs>
      </TabsContainer>
    </RecipeContainer>
  </Container>
)
