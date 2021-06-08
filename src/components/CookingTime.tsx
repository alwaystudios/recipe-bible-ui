import React from 'react'
import styled from '@emotion/styled'
import { RB_GREEN } from '../colors'
import { MEDIUM_SCREEN } from '../breakpoints'
import DinnerPlate from '../public/dinner-plate.svg'

export const Container = styled.div`
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;

  > p {
    margin-left: 1rem;
  }

  > span {
    background-color: ${RB_GREEN};
    border-radius: 50%;
    padding: 0.5rem;
  }

  img {
    width: 30px;
  }

  @media only screen and (min-width: ${MEDIUM_SCREEN}px) {
    img {
      width: 20px;
    }
  }
`

export const CookingTime: React.FC<{ cookingTime: string }> = ({ cookingTime }) => (
  <Container>
    <span>
      <img src={DinnerPlate} />
    </span>
    <p>{cookingTime}</p>
  </Container>
)
