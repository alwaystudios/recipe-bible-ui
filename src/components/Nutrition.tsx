import styled from '@emotion/styled'
import React from 'react'
import { RB_BLUE, RB_GREEN } from '../colors'

const NutritionItem = styled.div`
  display: flex;
  margin-bottom: 0.5rem;

  > p {
    border: 1px solid ${RB_BLUE};
    padding: 0.25rem;
    border-radius: 5%;
    width: 7rem;
    margin-right: 0.25rem;
    text-align: center;
  }

  > p:first-of-type {
    background-color: ${RB_GREEN};
    color: white;
  }
`

type Props = {
  carbs: string
  protein: string
  fat: string
}

export const Nutrition: React.FunctionComponent<Props> = ({ carbs, protein, fat }) => (
  <>
    {fat && (
      <NutritionItem>
        <p>fat</p>
        <p>{fat}</p>
      </NutritionItem>
    )}
    {carbs && (
      <NutritionItem>
        <p>carbs</p>
        <p> {carbs}</p>
      </NutritionItem>
    )}
    {protein && (
      <NutritionItem>
        <p>protein</p>
        <p> {protein}</p>
      </NutritionItem>
    )}
  </>
)
