import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { SMALL_SCREEN } from '../breakpoints'

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

  @media only screen and (max-width: ${SMALL_SCREEN}px) {
    border-radius: 2%;
    max-width: 100%;
    width: 100%;
  }
`

type Props = {
  src: string
  size: 'small' | 'medium' | 'large'
}

export const RecipeImage: React.FC<Props> = ({ src, size }) => <Img size={size} src={src} />
