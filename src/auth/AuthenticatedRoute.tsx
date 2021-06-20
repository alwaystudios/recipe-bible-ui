import React from 'react'
import { InferProps } from 'prop-types'
import { Route, useHistory } from 'react-router-dom'
import { useAuthContext } from './AuthContext'

type AuthenticatedRouteProps = {
  component: React.ElementType
  path: string
  role?: string
  rest?: unknown
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  component: ComponentToRender,
  path,
  role,
  rest,
}: InferProps<typeof AuthenticatedRoute.propTypes>) => {
  const { login, user, tokenExpired } = useAuthContext()
  const history = useHistory()

  if (!user || tokenExpired) {
    login()
    return null
  }

  if (role && !user['https://recipebible.net/roles'].includes(role)) {
    history.push('/403')
  }

  return <Route path={path}>{<ComponentToRender {...rest} />}</Route>
}
