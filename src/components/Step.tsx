import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Step as StepType } from '@alwaystudios/recipe-bible-sdk'
import { Button, CopyToClipboard } from '@alwaystudios/as-ui-components'

const Container = styled.div`
  display: flex;
  flex: 0 100%;
  align-items: top;
  justify-content: left;
  padding: 1rem;
  font-size: large;

  & > img {
    object-fit: cover;
    width: 7rem;
    height: 7rem;
    padding-bottom: 0.5rem;
    border-radius: 15%;
    margin-right: 1rem;
  }

  & > div {
    max-width: 20rem;
  }
`

const ImageIndexSpan = styled.span`
  position: relative;
  top: -0.2rem;
  left: 0.5rem;
  background-color: #4cc912;
  color: white;
  height: fit-content;
  padding: 0.25rem;
  border-radius: 15%;
`

const IndexSpan = styled.span`
  position: relative;
  background-color: #4cc912;
  color: white;
  height: fit-content;
  padding: 0.25rem;
  top: -0.25rem;
  border-radius: 15%;
  margin-right: 0.5rem;
  margin-left: 0.49rem;
`

const DeleteSpan = styled.span`
  ${({ indexOnly }: { indexOnly: boolean }) =>
    indexOnly
      ? css`
          top: -0.5rem;
          left: -0.25rem;
        `
      : css`
          top: -0.25rem;
          left: -2.5rem;
        `}
  position: relative;

  & > button {
    border-radius: 50%;
  }
`

type Props = {
  index: number
  step: StepType
  onDelete?: (step: string) => void // eslint-disable-line no-unused-vars
}

export const Step: React.FC<Props> = ({ index, step, onDelete }) => {
  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault()
    onDelete(step.step)
  }

  return (
    <Container>
      {step.imgSrc ? (
        <>
          <ImageIndexSpan>{index}</ImageIndexSpan>
          <img src={step.imgSrc} />
        </>
      ) : (
        <IndexSpan>{index}</IndexSpan>
      )}
      {onDelete && (
        <DeleteSpan indexOnly={!step.imgSrc}>
          <Button text="delete" onClick={handleDelete} />
        </DeleteSpan>
      )}
      <div>
        {step.step}
        {onDelete && <CopyToClipboard text={step.step} />}
      </div>
    </Container>
  )
}
