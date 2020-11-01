import React from 'react'
import styled, { css } from 'styled-components'

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

type ComponentProps = {
  src: string
  size: 'small' | 'medium' | 'large'
}

export const RecipeImage: React.FunctionComponent<ComponentProps> = ({ src, size }) => (
  <Container>
    <Img size={size} src={src} />
  </Container>
)
