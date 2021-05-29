import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { RB_BLUE } from './colors'

const StyledMenu = styled.div<{ selected: boolean }>`
  ${({ selected }) => css`
    padding-top: 3px;
    padding-bottom: 2px;
    padding-right: 5px;
    padding-left: 5px;
    margin-right: 1.5rem;
    border-bottom: 2px solid ${selected ? RB_BLUE : 'white'};
    font-weight: ${selected ? 'bold' : 'normal'};
    cursor: pointer;
  `}
`

type Props = {
  label: string
  className?: string
  onClick?: () => void
  selected?: boolean
}

export const MenuItem: React.FC<Props> = ({ selected = false, label, className = '', onClick }) => {
  return (
    <StyledMenu className={className} onClick={onClick} selected={selected}>
      {label}
    </StyledMenu>
  )
}
