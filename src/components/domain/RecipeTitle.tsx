import { kebabify } from '@alwaystudios/as-utils'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mediumScreen } from '../../config'

const Strong = styled.strong`
  font-size: x-large;
  text-align: center;
`

const Small = styled.span`
  margin-left: 0.25rem;
  font-size: small;
  color: green;

  @media only screen and (max-width: ${mediumScreen}px) {
    margin-left: 0;
    margin-top: 0.25rem;
  }
`

const Span = styled.span`
  :hover {
    cursor: pointer;
  }
`

type ComponentProps = {
  name: string
  author?: string
}

export const RecipeTitle: React.FunctionComponent<ComponentProps> = ({ name, author }) => (
  <>
    <Strong>{name}</Strong>
    {author && (
      <Small>
        <Link to={`/chefs/${kebabify(author)}`}>
          <Span> by {author}</Span>
        </Link>
      </Small>
    )}
  </>
)
