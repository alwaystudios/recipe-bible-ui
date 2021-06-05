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

const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow: hidden;
`

export const App: React.FC = () => (
  <AuthProvider>
    <Header mainText="RecipeBible.net" />
    <Page>
      <Switch>
        <AuthenticatedRoute path="/account" component={MyAccountPage} />
        <Route path="/about" component={AboutPage} />
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
