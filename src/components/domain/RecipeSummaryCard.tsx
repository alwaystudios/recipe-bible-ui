import { dekebabify, sentenceCase } from '@alwaystudios/as-utils'
import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { smallScreen, mediumScreen, S3_BUCKET } from '../../config'

const Container = styled.div`
  flex: 1 1 30%;
  max-width: 30%;
  display: flex;
  flex-direction: column;
  background-color: #bddebd;
  border: solid white 1px;
  border-radius: 1%;
  width: 9rem;
  height: 13rem;
  margin: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: pink;
    border: solid black 1px;
  }

  > img {
    height: 80%;
    object-fit: cover;
  }

  @media only screen and (max-width: ${smallScreen}px) {
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

  @media only screen and (max-width: ${mediumScreen}px) {
    font-size: small;
  }

  @media only screen and (max-width: ${smallScreen}px) {
    font-size: large;
  }
`

type Props = {
  title: string
  imgSrc: string
}

export const RecipeSummaryCard: FunctionComponent<Props> = ({ title, imgSrc }) => {
  const history = useHistory()
  return (
    <Container className="recipe-summary-card" onClick={() => history.push(`/recipes/${title}`)}>
      <img src={`${S3_BUCKET}/recipes/${title}/${imgSrc}`} />
      <Title>{sentenceCase(dekebabify(title))}</Title>
    </Container>
  )
}
