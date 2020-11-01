import './App.css'
import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CreateRecipe } from './components/pages/CreateRecipe'
import { Recipes } from './components/pages/Recipes'
import { Profile } from './components/pages/Account'
import { NavMenuItem } from './components/layout/NavMenuItem'
import { About } from './components/pages/About'
import { Auth } from './components/pages/Auth'
import { useAuthentication } from './hooks/useAuthentication'
import { AdminOptions } from './components/pages/AdminOptions'
import { ChefPhoto } from './components/domain/ChefPhoto'
import { Logo } from './components/layout/Logo'
import { Header } from './components/layout/Header'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Privacy } from './components/pages/Privacy'
import { Terms } from './components/pages/Terms'
import { Chefs } from './components/pages/Chefs'
import { SocialMedia } from './components/domain/SocialMedia'

export const App: FunctionComponent = () => {
  const { user } = useAuthentication(false)
  return (
    <div className="rb">
      <Router>
        <Header>
          <Logo />
          <Nav>
            <NavMenuItem title="Recipes" location="/recipes" />
            <NavMenuItem title="Cookbook" location="/account" />
            <NavMenuItem title="Create" location="/recipes/create" />
            <NavMenuItem title="About" location="/about" />
            {user.roles.includes('admin') && <NavMenuItem title="Admin" location="/admin" />}
          </Nav>
          {user && (
            <span className="user-photo">
              <ChefPhoto src={user.picture} name={user.name} size="small" />
            </span>
          )}
        </Header>
        <SocialMedia />
        <Switch>
          <Route path="/recipes/create">
            <CreateRecipe />
          </Route>
          <Route path="/account">
            <Profile />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/chefs">
            <Chefs />
          </Route>
          {user.roles.includes('admin') && (
            <Route path="/admin">
              <AdminOptions />
            </Route>
          )}
          <Route path={['/recipes', '/']}>
            <Recipes />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}
