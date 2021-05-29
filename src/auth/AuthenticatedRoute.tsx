import React, { useContext } from 'react'
import { InferProps } from 'prop-types'
import { Route } from 'react-router-dom'
import { AuthContext } from './AuthContext'

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
  const { login, user, tokenExpired } = useContext(AuthContext)

  if (!user || tokenExpired) {
    login()
    return null
  }

  return <Route path={path}>{<ComponentToRender {...rest} />}</Route>
}
