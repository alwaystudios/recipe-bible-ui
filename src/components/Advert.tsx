import styled from '@emotion/styled'
import React from 'react'

const Container = styled.div`
  width: 140px;
  height: 260px;
  margin-width: 0;
  margin-height: 0;
  position: relative;
  overflow: hidden;
  margin: 5px;
`

const Mask = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  cursor: pointer;
`

const Iframe = styled.iframe`
  pointer-events: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

type Props = {
  src: string
  href: string
}

export const Advert: React.FunctionComponent<Props> = ({ src, href }) => (
  <Container>
    <Mask role="iframe-mask" onClick={() => window.open(href, '_blank')} />
    <Iframe frameBorder="0" scrolling="no" src={src} />
  </Container>
)
