import { Button, TextInput } from '@alwaystudios/as-ui-components'
import styled from '@emotion/styled'
import React from 'react'
import { YouWillNeed } from './YouWillNeed'

const Container = styled.div`
  margin: 1rem 0 0 1rem;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;

  & > button {
    margin: 0;
  }
`

type Props = {
  setInput: (value: string) => void
  youWillNeed: string[]
  input: string
  onUpdate: () => void
  onDelete: (value: string) => void
}

export const YouWillNeedForm: React.FC<Props> = ({
  setInput,
  youWillNeed,
  input,
  onUpdate,
  onDelete,
}) => (
  <Container>
    <TextContainer>
      <TextInput
        role="you-will-need"
        id="you-will-need-input"
        onChange={(event) => setInput(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key.toLocaleLowerCase() === 'enter') {
            onUpdate()
          }
        }}
        value={input}
      />
      <Button text="add" isSubmit={false} onClick={onUpdate} disabled={input === ''} />
    </TextContainer>
    <YouWillNeed values={youWillNeed} onDelete={onDelete} />
  </Container>
)
