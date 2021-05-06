import React, { useContext } from 'react'
import { InferProps } from 'prop-types'
import { Route } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import _ from 'lodash'

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
	const { login, user, tokens } = useContext(AuthContext)

	const tokenExpired = Date.now() > _.get(tokens, ['expiresAt'], 0)
	console.log('expiresAt', _.get(tokens, ['expiresAt']))
	console.log('now', Date.now())
	console.log('tokenExpired', tokenExpired)

	if (!user || tokenExpired) {
		login()
		return null
	}

	return <Route path={path}>{<ComponentToRender {...rest} />}</Route>
}
