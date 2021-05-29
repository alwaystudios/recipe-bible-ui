import React, { useContext } from 'react'
import { InferProps } from 'prop-types'
import { Route } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import { pathOr } from 'ramda'

type AuthenticatedRouteProps = {
  component: React.ElementType
  path: string
  rest?: unknown
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  component: ComponentToRender,
  path,
  rest,
}: InferProps<typeof AuthenticatedRoute.propTypes>) => {
  const { login, user, tokens, tokenExpired } = useContext(AuthContext)

  console.log('idToken', pathOr('', ['idToken'], tokens))

  if (!user || tokenExpired) {
    login()
    return null
  }

  return <Route path={path}>{<ComponentToRender {...rest} />}</Route>
}
