import React from 'react'
import styled from '@emotion/styled'
import { RB_GREEN } from '../colors'
import { MEDIUM_SCREEN } from '../breakpoints'
import DinnerPlate from '../public/clock.svg'

export const Container = styled.div`
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;

  > p {
    margin-left: 1rem;
  }

  img {
    width: 30px;
  }

  @media only screen and (max-width: ${MEDIUM_SCREEN}px) {
    img {
      width: 20px;
    }
  }
`

const Img = styled.img`
  border-radius: 50%;
  background-color: ${RB_GREEN};
  padding: 0.2rem;
`

export const CookingTime: React.FC<{ cookingTime: string }> = ({ cookingTime }) => (
  <Container>
    <Img src={DinnerPlate} />
    <p>{cookingTime}</p>
  </Container>
)
