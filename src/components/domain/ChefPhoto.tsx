import React, { FunctionComponent } from 'react'
import styled, { css } from 'styled-components'

const Photo = styled.img`
  ${({ isSmall }: { isSmall: boolean }) =>
    isSmall
      ? css`
          height: 40px;
          width: 40px;
        `
      : css`
          height: 100px;
          width: 100px;
        `}

  border-radius: 50%;
`

type Props = {
  src: string
  name: string
  size?: 'small' | 'regular'
}

export const ChefPhoto: FunctionComponent<Props> = ({ src, name, size = 'regular' }) => (
  <Photo isSmall={size === 'small'} src={src} alt={name} />
)
