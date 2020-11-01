import React from 'react'
import styled from 'styled-components'

const Iframe = styled.iframe`
  width: 120px;
  height: 260px;
  margin-width: 0;
  margin-height: 0;
`

type Props = {
  id: number
  src: string
}

export const Advert: React.FunctionComponent<Props> = ({ id, src }) => (
  <Iframe id={`${id}`} frameBorder="0" scrolling="no" src={src} />
)
