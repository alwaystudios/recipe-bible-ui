import './App.css'
import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { CreateRecipe } from './components/CreateRecipe'
import { Recipes } from './components/Recipes'
import { Profile } from './components/Account'

export const App: FunctionComponent = () => (
  <div className="rb">
    <header className="rb-header">Recipe Bible</header>
    <Router>
      <nav className="rb-nav">
        <div className="rb-nav-link">
          <Link to="/recipes">What's cooking</Link>
        </div>
        <div className="rb-nav-link">
          <Link to="/recipe/create">Create a recipe</Link>
        </div>
        <div className="rb-nav-link">
          <Link to="/account">Account</Link>
        </div>
      </nav>
      <Switch>
        <Route path="/recipes">
          <Recipes />
        </Route>
        <Route path="/recipe/create">
          <CreateRecipe />
        </Route>
        <Route path="/account">
          <Profile />
        </Route>
      </Switch>
    </Router>
  </div>
)
