import React from 'react'
import { TwitterIcon, FacebookIcon, EmailIcon } from 'react-share'
import styled from 'styled-components'
import { ExternalLink } from './ExternalLink'
import { Box } from './layout/Box'

const Container = styled.div`
  align-items: center;

  > a {
    margin: 0.25rem;
  }
`

export const Contact = () => (
  <Box title="Contact us">
    <Container style={{ flexDirection: 'column' }}>
      <ExternalLink href="mailto:recipebiblecontact@gmail.com">
        <EmailIcon borderRadius={50} size={30} />
      </ExternalLink>
      <ExternalLink href="https://www.facebook.com/pg/RecipeBibleUK">
        <FacebookIcon borderRadius={50} size={30} />
      </ExternalLink>
      <ExternalLink href="https://twitter.com/RecipeBibleUK">
        <TwitterIcon borderRadius={50} size={30} />
      </ExternalLink>
      {/* <ExternalLink href="https://www.instagram.com/recipebibleuk">
        <LogoInstagram32 /> todo: ui components needs instagram icon
      </ExternalLink> */}
    </Container>
  </Box>
)
