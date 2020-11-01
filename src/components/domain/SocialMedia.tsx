import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share'
import { ExternalLink } from '../ExternalLink'
import { InstagramIcon } from '@alwaystudios/as-ui-components'
import { useAuthentication } from '../../hooks/useAuthentication'
import { kebabify } from '@alwaystudios/as-utils'

const Container = styled.div`
  padding-top: 1rem;
  margin-bottom: 0.75rem;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

  .react-share__ShareButton:first-of-type {
    margin-left: 0.5rem;
    margin-right: 0.25rem;
  }

  .react-share__ShareButton {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
`

export const SocialMedia: React.FunctionComponent = () => {
  const location = useLocation()
  const { user } = useAuthentication(false)

  const hashtag = 'recipebibleuk'
  const url =
    location.pathname === '/account'
      ? `https://recipebible.net/chefs/${kebabify(user.name)}`
      : `https://recipebible.net${location.pathname}`

  const extractRecipeFromRoute = (path: string) => {
    if (!path.includes('/recipes/')) {
      return 'Recipe Bible'
    }

    return path.replace('/recipes/', '')
  }

  const title = extractRecipeFromRoute(location.pathname)
  const disabled = location.pathname.includes('/recipes/edit/')

  return (
    <Container className="flex-row">
      <ExternalLink href="https://www.instagram.com">
        <InstagramIcon size="40px" />
      </ExternalLink>
      <TwitterShareButton disabled={disabled} url={url} title={title} hashtags={[hashtag]}>
        <TwitterIcon borderRadius={50} size={40} />
      </TwitterShareButton>
      <FacebookShareButton disabled={disabled} url={url} quote={title} hashtag={`#${hashtag}`}>
        <FacebookIcon borderRadius={50} size={40} />
      </FacebookShareButton>
      <RedditShareButton disabled={disabled} url={url} title={title}>
        <RedditIcon borderRadius={50} size={40} />
      </RedditShareButton>
    </Container>
  )
}
