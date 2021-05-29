import React from 'react'
import { Route, Switch } from 'react-router'
import { useHistory, useLocation } from 'react-router-dom'
import { AuthProvider } from '../auth/AuthContext'
import { AuthenticatedRoute } from '../auth/AuthenticatedRoute'
import { Callback } from '../auth/Callback'
import { Account } from './Account'
import { Header } from './Header'
import { Logout } from './Logout'
import { MenuItem } from './MenuItem'
import styled from '@emotion/styled'

const Page = styled.div`
  padding: 2rem;
  overflow: hidden;
`

export const App: React.FC = () => {
  const router = useLocation()
  const history = useHistory()

  return (
    <AuthProvider>
      <Header mainText="Recipe Bible">
        <MenuItem
          selected={router.pathname === '/'}
          label="What's cooking"
          onClick={() => history.push('/')}
        />
        <MenuItem
          selected={router.pathname === '/account'}
          label="Account"
          onClick={() => history.push('/account')}
        />
        <MenuItem
          selected={router.pathname === '/logout'}
          label="Logout"
          onClick={() => history.push('/logout')}
        />
      </Header>
      <Page>
        <Switch>
          <AuthenticatedRoute path="/account" component={Account} />
          <Route path="/auth" component={Callback} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Page>
    </AuthProvider>
  )
}
