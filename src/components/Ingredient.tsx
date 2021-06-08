import React from 'react'
import styled from '@emotion/styled'
import { ErrorIcon } from '@alwaystudios/as-ui-components'

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
  top: -0.25rem;
  left: -2.5rem;

  & > button {
    border-radius: 50%;
  }
`

type Props = {
  imgSrc: string
  label: string
  // eslint-disable-next-line no-unused-vars
  onDelete?: (step: string) => void
}

export const Ingredient: React.FC<Props> = ({ imgSrc, label, onDelete }) => {
  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault()
    onDelete(label)
  }

  return (
    <Container>
      <img src={imgSrc} />
      {onDelete && (
        <DeleteSpan onClick={handleDelete}>
          <ErrorIcon />
        </DeleteSpan>
      )}
      <p>{label}</p>
    </Container>
  )
}
