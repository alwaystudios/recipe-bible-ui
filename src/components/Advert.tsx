import styled from '@emotion/styled'
import React from 'react'

const Iframe = styled.iframe`
  width: 120px;
  height: 260px;
  margin-width: 0;
  margin-height: 0;
`

type Props = {
  src: string
}

export const Advert: React.FunctionComponent<Props> = ({ src }) => (
  <Iframe frameBorder="0" scrolling="no" src={src} />
)
