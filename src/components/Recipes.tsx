import React, { FunctionComponent } from 'react'
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom'
import { Recipe } from './Recipe'
import { useApiRequest } from '../hooks/useApiRequest'
import { getRecipes } from '../apiClient'

export const Recipes: FunctionComponent = () => {
  const match = useRouteMatch()
  const { data, error } = useApiRequest<[{ title: string }]>(getRecipes())

  return (
    <Switch>
      <Route path={`${match.path}/:recipe`}>
        <Recipe />
      </Route>
      <Route path={match.path}>
        {error ? (
          <>
            <h2>Error</h2>
            An error has occured
          </>
        ) : (
          <>
            <h2>Recipes</h2>
            {data &&
              data.map(({ title }) => (
                <div key={title}>
                  <Link to={`${match.url}/${title}`}>{title}</Link>
                </div>
              ))}
          </>
        )}
      </Route>
    </Switch>
  )
}
