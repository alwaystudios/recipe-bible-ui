import { ArrowIcon } from '@alwaystudios/as-ui-components'
import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'

const BackContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > svg {
    margin: 0 !important;
  }
`

type Props = {
  text?: string
  to: string
}

export const BackToLink: React.FC<Props> = ({ text = 'back', to }) => (
  <Link to={to} role="link">
    <BackContainer>
      <ArrowIcon direction="right" size="20px" />
      {text}
    </BackContainer>
  </Link>
)
