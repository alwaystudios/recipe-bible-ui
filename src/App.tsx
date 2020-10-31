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

export const App: FunctionComponent = () => {
  const {
    user: { roles },
  } = useAuthentication(false)
  return (
    <div className="rb">
      <Router>
        <header className="rb-header">
          <nav className="rb-nav">
            <NavMenuItem title="Recipes" location="/recipes" />
            <NavMenuItem title="Cookbook" location="/account" />
            <NavMenuItem title="Create" location="/recipes/create" />
            <NavMenuItem title="About" location="/about" />
            {roles.includes('admin') && <NavMenuItem title="Admin" location="/admin" />}
          </nav>
        </header>
        <Switch>
          <Route path="/recipes/create">
            <CreateRecipe />
          </Route>
          <Route path="/recipes">
            <Recipes />
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
          {roles.includes('admin') && (
            <Route path="/admin">
              <AdminOptions />
            </Route>
          )}
        </Switch>
      </Router>
    </div>
  )
}
