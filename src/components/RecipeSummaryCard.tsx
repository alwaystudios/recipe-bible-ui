import styled from '@emotion/styled'
import React from 'react'
import { MEDIUM_SCREEN, SMALL_SCREEN } from '../breakpoints'
import { RB_LIGHT_GREEN, RB_GREEN } from '../colors'

const Container = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  background-color: ${RB_LIGHT_GREEN};
  border: solid white 1px;
  border-radius: 1%;
  min-width: 9rem;
  height: 13rem;
  margin: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${RB_GREEN};
    border: solid black 1px;
  }

  > img {
    height: 80%;
    min-height: 80%;
    object-fit: cover;
  }

  @media only screen and (max-width: ${SMALL_SCREEN}px) {
    flex: 1 1 100%;
    max-width: 100%;
    margin: 0;
    margin-bottom: 0.5rem;
  }
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  font-size: medium;
  font-weight: bold;

  @media only screen and (max-width: ${MEDIUM_SCREEN}px) {
    font-size: small;
  }

  @media only screen and (max-width: ${SMALL_SCREEN}px) {
    font-size: large;
  }
`

type Props = {
  title: string
  imgSrc: string
  onClick: () => void
}

export const RecipeSummaryCard: React.FC<Props> = ({ title, imgSrc, onClick }) => (
  <Container onClick={onClick}>
    <img src={imgSrc} />
    <Title>{title}</Title>
  </Container>
)
