import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Recipe } from '@alwaystudios/recipe-bible-sdk'

const Container = styled.div`
  width: 100%;
`

type Props = {
  recipe: Recipe
}

export const RecipeTabs: FunctionComponent<Props> = ({ recipe }) => {
  // const { steps, ingredients, nutrition } = recipe
  return (
    <Container className="recipe-tabs">
      {JSON.stringify(recipe)}
      {/* <Tabs>
        <Tab title="Ingredients">
          <Ingredients ingredients={ingredients} className="rb-tab-content" />
        </Tab>
        <Tab title="Steps">
          <Steps steps={steps} className="rb-tab-content" />
        </Tab>
        <Tab title="Nutrition">
          <Nutrition nutrition={nutrition} className="rb-tab-content" />
        </Tab>
      </Tabs> */}
    </Container>
  )
}
