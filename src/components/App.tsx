import React from 'react'
import { Route, Switch } from 'react-router'
import { AuthProvider } from '../auth/AuthContext'
import { AuthenticatedRoute } from '../auth/AuthenticatedRoute'
import { Callback } from '../auth/Callback'
import { Header } from './Header'
import { Logout } from '../auth/Logout'
import styled from '@emotion/styled'
import { MyAccountPage } from '../pages/MyAccount'
import { AboutPage } from '../pages/About'
import { WhatsCookingPage } from '../pages/WhatsCooking'

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
        <Route path="/auth" component={Callback} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={WhatsCookingPage} />
      </Switch>
    </Page>
  </AuthProvider>
)
