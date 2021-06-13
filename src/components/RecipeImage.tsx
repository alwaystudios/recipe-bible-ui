import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

const Img = styled.img`
  ${({ size }: { size: 'small' | 'medium' | 'large' }) =>
    size === 'small'
      ? css`
          max-width: 5rem;
          max-height: 5rem;
        `
      : size === 'medium'
      ? css`
          max-width: 22rem;
          max-height: 22rem;
        `
      : css`
          max-width: 25rem;
          max-height: 25rem;
        `}
  border-radius: 10%;
  object-fit: cover;
`

type Props = {
  src: string
  size: 'small' | 'medium' | 'large'
}

export const RecipeImage: React.FC<Props> = ({ src, size }) => <Img size={size} src={src} />
