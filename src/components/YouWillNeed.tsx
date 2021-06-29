import { Pill } from '@alwaystudios/as-ui-components'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { RB_LIGHT_GREEN, RB_TEXT } from '../colors'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const YouWillNeedValue = styled.span<{ onClick: any }>`
  ${({ onClick }) => css`
    cursor: ${onClick ? 'pointer' : 'default'};
    margin: 0 0.25rem 0.25rem 0;
    white-space: nowrap;
  `}
`

type Props = {
  values: string[]
  onDelete?: (value: string) => void
}

export const YouWillNeed: React.FC<Props> = ({ values, onDelete }) => {
  return (
    <Container>
      {values.map((label) => (
        <YouWillNeedValue key={label} onClick={() => onDelete && onDelete(label)}>
          <Pill backgroundColor={RB_LIGHT_GREEN} color={RB_TEXT} label={label} />
        </YouWillNeedValue>
      ))}
    </Container>
  )
}
