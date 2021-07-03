import { EmailIcon, FacebookIcon, InstagramIcon } from '@alwaystudios/as-ui-components'
import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../auth/AuthContext'
import { RB_GREEN } from '../colors'
import { ExternalLink } from './ExternalLink'

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1rem 0 0 0;

  a {
    margin: 0 0.5rem;
  }
`

const SocialMediaContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;

  & > a {
    margin: 0.5rem;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 4px solid ${RB_GREEN};
  margin: 0 5rem;
`

export const Footer: React.FunctionComponent = () => {
  const { user } = useAuthContext()

  return (
    <Container>
      <LinksContainer>
        <Link to="/about">About</Link>
        <Link to="/terms">Terms and conditions</Link>
        <Link to="/privacy">Privacy policy</Link>
        {user && <Link to="/logout">Logout</Link>}
      </LinksContainer>
      <SocialMediaContainer>
        <ExternalLink href="mailto:recipebiblecontact@gmail.com" role="email-link">
          <EmailIcon size="30px" />
        </ExternalLink>
        <ExternalLink href="https://www.facebook.com/pg/RecipeBibleUK" role="facebook-link">
          <FacebookIcon size="30px" />
        </ExternalLink>
        <ExternalLink href="https://www.instagram.com/recipebibleuk" role="instagram-link">
          <InstagramIcon size="30px" />
        </ExternalLink>
      </SocialMediaContainer>
    </Container>
  )
}
