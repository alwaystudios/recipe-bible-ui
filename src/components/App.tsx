import React from 'react'
import { Route, Switch } from 'react-router'
import { AuthProvider } from '../auth/AuthContext'
import { AuthenticatedRoute } from '../auth/AuthenticatedRoute'
import { Callback } from '../auth/Callback'
import { Header } from './Header'
import { Logout } from '../auth/Logout'
import styled from '@emotion/styled'
import { MyAccountPage } from '../pages/MyAccountPage'
import { AboutPage } from '../pages/AboutPage'
import { WhatsCookingPage } from '../pages/WhatsCookingPage'
import { Footer } from './Footer'
import { TermsPage } from '../pages/TermsPage'
import { PrivacyPage } from '../pages/PrivacyPage'
import { SMALL_SCREEN } from '../breakpoints'
import { RecipePage } from '../pages/RecipePage'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  overflow: hidden;

  @media only screen and (max-width: ${SMALL_SCREEN}px) {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
`

export const App: React.FC = () => (
  <AuthProvider>
    <Header mainText="RecipeBible.net" />
    <Page>
      <Switch>
        <AuthenticatedRoute path="/account" component={MyAccountPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/recipes/:name" component={RecipePage} />
        <Route path="/recipes" component={WhatsCookingPage} />
        <Route path="/logout" component={Logout} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/" component={Callback} />
      </Switch>
    </Page>
    <Footer />
  </AuthProvider>
)
