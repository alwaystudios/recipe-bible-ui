import React from 'react'
import { Route, Switch } from 'react-router'
import { useHistory, useLocation } from 'react-router-dom'
import { AuthProvider } from '../auth/AuthContext'
import { AuthenticatedRoute } from '../auth/AuthenticatedRoute'
import { Callback } from '../auth/Callback'
import { Header } from './Header'
import { Logout } from '../auth/Logout'
import { MenuItem } from './MenuItem'
import styled from '@emotion/styled'
import { MyCookbook } from './MyCookbook'

const Page = styled.div`
  padding: 2rem;
  overflow: hidden;
`

export const App: React.FC = () => {
  const router = useLocation()
  const history = useHistory()

  return (
    <AuthProvider>
      <Header mainText="RecipeBible.net">
        <MenuItem
          selected={router.pathname === '/'}
          label="What's cooking"
          onClick={() => history.push('/')}
        />
        <MenuItem
          selected={router.pathname === '/account/cookbook'}
          label="My cookbook"
          onClick={() => history.push('/account/cookbook')}
        />
      </Header>
      <Page>
        <Switch>
          <AuthenticatedRoute path="/account/cookbook" component={MyCookbook} />
          <AuthenticatedRoute path="/account" component={() => null} />
          <Route path="/auth" component={Callback} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Page>
    </AuthProvider>
  )
}
