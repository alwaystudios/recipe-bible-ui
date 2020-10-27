import './App.css'
import React, { useState } from 'react'
import { Button } from '@alwaystudios/as-ui-components'
import request from 'superagent'
import { useAuth0 } from '@auth0/auth0-react'

const BASE_URL = 'http://localhost:3001/api/v2'

export const App = () => {
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0()
  const [message, setMessage] = useState('')

  const LogoutButton = () => {
    return <Button text="logout" onClick={() => logout({ returnTo: window.location.origin })} />
  }

  const LoginButton = () => {
    return <Button onClick={() => loginWithRedirect()} text="Log In" />
  }

  const postCreateRecipe = async (recipe: any): Promise<any> => {
    await getAccessTokenSilently({
      audience: `https://dev-27x9tbv3.eu.auth0.com/api/v2/`,
      scope: 'read:current_user',
    })
      .then(async (accessToken) => {
        await request
          .post(`${BASE_URL}/recipe`)
          .send(recipe)
          .set('Access-Control-Allow-Origin', '*')
          .set('Content-Type', 'application/json')
          .set('authorization', `Bearer ${accessToken}`)
          .then(() => {
            setMessage('pass')
          })
          .catch(() => {
            setMessage('fail')
          })
      })
      .catch(() => {
        setMessage('unauthorized')
      })
  }

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault()
    setMessage('')
    postCreateRecipe({ title: 'my recipe 2' }).then((data) => {
      console.log(data)
    })
  }

  return (
    <div className="App">
      <header className="App-header">todo</header>
      {isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user['https://recipebible.net/roles']}</p>
        </div>
      )}
      <LoginButton />
      <LogoutButton />
      <div>Message: {message}</div>
      <Button text="create recipe" onClick={onClick} />
    </div>
  )
}
