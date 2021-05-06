import React, { useContext } from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { AuthContext, AuthProvider } from '../auth/AuthContext'
import { AuthenticatedRoute } from '../auth/AuthenticatedRoute'
import { Callback } from '../auth/Callback'

// todo: extract
const Account: React.FunctionComponent = () => {
	const { user } = useContext(AuthContext)

	return <>{JSON.stringify(user)}</>
}

const Loggout: React.FC = () => {
	const { logout } = useContext(AuthContext)
	logout()
	return null
}

// todo: unit tests
export const App: React.FC = () => {
	return (
		<AuthProvider>
			<Link to="/">Home</Link>
			<Link to="/account">Account</Link>
			<Link to="/loggout">Loggout</Link>
			<Switch>
				<AuthenticatedRoute path="/account" component={Account} />
				<Route path="/auth" component={Callback} />
				<Route path="/loggout" component={Loggout} />
			</Switch>
		</AuthProvider>
	)
}
