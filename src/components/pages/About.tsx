import { Button } from '@alwaystudios/as-ui-components'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { mediumScreen, smallScreen } from '../../config'
import { Contact } from '../Contact'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;

  > hr {
    margin-top: 4rem;
    margin-bottom: 2rem;
  }

  .about-content {
    justify-content: center;
    align-items: center;
  }

  .rb-banner {
    font-size: xx-large;
  }

  @media only screen and (max-width: ${mediumScreen}px) {
    .rb-banner {
      font-size: large;
    }
  }

  @media only screen and (max-width: ${smallScreen}px) {
    .rb-banner {
      font-size: medium;
    }
  }
`

const AboutText = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-bottom: 2rem;
  text-align: justify;
  text-justify: inter-word;

  & > p {
    font-size: large;
  }
`

export const About: React.FunctionComponent = () => {
  const history = useHistory()

  return (
    <Container>
      <div className="flex-row">
        <p style={{ margin: 'auto' }} className="rb-banner">
          <b>Recipe Bible</b>, the world's online cookbook
        </p>
      </div>
      <AboutText>
        <p>
          Recipe Bible is not just a website. Together we create an encyclopedia of recipes. You can
          contribute, add recipes and share them with your network under your name. No blogging, no
          long words or paragraphs, just a recipe whenever you need it. Log in now and start adding
          delicious dishes to your personalized cookbook.
        </p>
      </AboutText>
      <Button text="Create a recipe" onClick={() => history.push('/recipes/create')} />
      <div className="about-content flex-row">
        <Contact />
      </div>
      <small>
        <i>release 2.0.0</i>
      </small>
    </Container>
  )
}
