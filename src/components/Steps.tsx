import { SortableList } from '@alwaystudios/as-ui-components'
import React from 'react'
import styled from '@emotion/styled'
import { Step as StepType } from '@alwaystudios/recipe-bible-sdk'
import { Step } from './Step'

const Container = styled(SortableList)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

type Props = {
  steps: StepType[]
  setSteps?: (steps: StepType[]) => void
  onDelete?: (step: string) => void
}

export const Steps: React.FC<Props> = ({ steps, setSteps, onDelete }) => {
  const children = steps.map((i, index) => (
    <Step index={index + 1} step={i} key={index} onDelete={onDelete} />
  ))

  return setSteps && onDelete ? (
    <Container data={steps} setData={setSteps}>
      {children}
    </Container>
  ) : (
    <div>{children}</div>
  )
}
