import { Button, Tab, Tabs } from '@alwaystudios/as-ui-components'
import { Recipe as RecipeType, toSlug } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../auth/AuthContext'
import { SMALL_SCREEN } from '../breakpoints'
import { fromRecipeApi } from '../domain/recipeTransformer'
import { Ingredients } from './Ingredients'
import { Nutrition } from './Nutrition'
import { RecipeImage } from './RecipeImage'
import { RecipeInfo } from './RecipeInfo'
import { Steps } from './Steps'
import { YouWillNeed } from './YouWillNeed'

// todo: bug fix button margin: 0
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;

  & > button {
    margin: 0;
    width: fit-content;
    margin-top: 1rem;
  }
`

const P = styled.p`
  margin-top: 1rem;
`

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;

  @media only screen and (max-width: ${SMALL_SCREEN}px) {
    flex-direction: column;
  }
`

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 90%;
  padding-left: 2rem;

  @media only screen and (max-width: ${SMALL_SCREEN}px) {
    padding: 1rem 0 0 0;
  }
`

type Props = {
  recipe: RecipeType
}

export const Recipe: React.FC<Props> = ({ recipe }) => {
  const {
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
  } = fromRecipeApi(recipe)

  const { user } = useAuthContext()
  const history = useHistory()

  return (
    <Container>
      <h1>{title}</h1>
      {user?.isAdmin && (
        <Button text="edit" onClick={() => history.push(`/manage/recipes/${toSlug(title)}`)} />
      )}
      <P>{story}</P>
      {youWillNeed.length > 0 && <P>You will need:</P>}
      <YouWillNeed values={youWillNeed} />
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
}
