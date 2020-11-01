import { DustbinIcon } from '@alwaystudios/as-ui-components'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

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
  link?: string
  onDelete: (step: string) => void
}

export const Ingredient: FunctionComponent<Props> = ({ link, imgSrc, label, onDelete }) => {
  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault()
    onDelete(label)
  }

  return (
    <Container>
      <img src={imgSrc} />
      {onDelete && (
        <DeleteSpan>
          <span onClick={handleDelete}>
            <DustbinIcon size="30px" />
          </span>
        </DeleteSpan>
      )}
      {link ? (
        <a href={link} target={link}>
          {label}
        </a>
      ) : (
        <p>{label}</p>
      )}
    </Container>
  )
}
