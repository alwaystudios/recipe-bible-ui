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
import { CreateRecipePage } from '../pages/CreateRecipePage'
import { ADMIN_ROLE } from '../contstants'
import { Http403 } from '../pages/403'
import { ManageRecipesPage } from '../pages/ManageRecipesPage'
import { AdminMenu } from './AdminMenu'
import { Http404 } from '../pages/404'
import { IngredientsPage } from '../pages/IngredientsPage'

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
      <AdminMenu />
      <Switch>
        <AuthenticatedRoute path="/account" component={MyAccountPage} />
        <AuthenticatedRoute
          path="/manage/recipes/create"
          role={ADMIN_ROLE}
          component={CreateRecipePage}
        />
        <AuthenticatedRoute
          path="/manage/recipes/:name"
          component={RecipePage}
          role={ADMIN_ROLE}
          rest={{ edit: true }}
        />
        <AuthenticatedRoute
          path="/manage/recipes"
          component={ManageRecipesPage}
          role={ADMIN_ROLE}
        />
        <Route path="/about" component={AboutPage} />
        <Route path="/recipes/:name" component={RecipePage} />
        <Route path="/recipes" component={WhatsCookingPage} />
        <Route path="/ingredients" component={IngredientsPage} />
        <Route path="/logout" component={Logout} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/403" component={Http403} />
        <Route exact path="/" component={Callback} />
        <Route component={Http404} />
      </Switch>
    </Page>
    <Footer />
  </AuthProvider>
)
