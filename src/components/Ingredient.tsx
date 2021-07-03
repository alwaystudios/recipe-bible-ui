import React from 'react'
import styled from '@emotion/styled'
import { ErrorIcon } from '@alwaystudios/as-ui-components'
import { Ingredient as IngredientType, toIngredientLabel } from '@alwaystudios/recipe-bible-sdk'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  max-width: 8rem;
  margin: 1rem;

  & > img {
    object-fit: cover;
    width: 8rem;
    height: 8rem;
    padding-bottom: 0.5rem;
    border-radius: 50%;
  }
`

const DeleteSpan = styled.span`
  position: relative;
  top: -9rem;
  left: 3rem;
  cursor: pointer;

  & > button {
    border-radius: 50%;
  }
`

type Props = {
  ingredient: IngredientType
  onDelete?: (step: string) => void
}

export const Ingredient: React.FC<Props> = ({
  ingredient: { imgSrc, name, quantity, measure },
  onDelete,
}) => {
  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault()
    onDelete(name)
  }

  return (
    <Container>
      <img src={imgSrc} />
      {onDelete && (
        <DeleteSpan onClick={handleDelete}>
          <ErrorIcon size="2rem" />
        </DeleteSpan>
      )}
      <p>{toIngredientLabel({ name, quantity: `${quantity}`, measure })}</p>
    </Container>
  )
}
