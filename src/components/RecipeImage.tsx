import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

const Container = styled.div`
  display: flex;
`

const Img = styled.img`
  ${({ size }: { size: 'small' | 'medium' | 'large' }) =>
    size === 'small'
      ? css`
          border: 1px solid black;
          width: 5rem;
          max-height: 5rem;
        `
      : size === 'medium'
      ? css`
          padding: 1.25rem;
          max-width: 22rem;
          max-height: 22rem;
        `
      : css`
          width: 25rem;
          max-height: 25rem;
        `}
  border-radius: 10%;
  max-width: 100%;
  height: auto;
  object-fit: cover;
`

type Props = {
  src: string
  size: 'small' | 'medium' | 'large'
}

export const RecipeImage: React.FC<Props> = ({ src, size }) => (
  <Container>
    <Img size={size} src={src} />
  </Container>
)
