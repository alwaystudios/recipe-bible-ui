import { Button, TextInput } from '@alwaystudios/as-ui-components'
import { useAuth0 } from '@auth0/auth0-react'
import { useAccessToken } from '../hooks/useAccessToken'
import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { postCreateRecipe } from '../apiClient'
import { useHistory } from 'react-router-dom'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

export const CreateRecipe: FunctionComponent = () => {
  const [title, setTitle] = useState<string>('')
  const { isAuthenticated } = useAuth0()
  const { accessToken, isLoading } = useAccessToken()
  const history = useHistory()
  const [error, setError] = useState<boolean>(false)

  const onClick = async (event: React.MouseEvent) => {
    event.preventDefault()
    if (title.length === 0) {
      setError(true)
      return
    }
    setError(false)
    return postCreateRecipe({ title }, accessToken)
      .then(() => {
        history.push(`/recipes/${title}`)
      })
      .catch(() => {
        setError(true)
      })
  }

  return isLoading ? (
    <>Loading...</>
  ) : (
    <Container>
      <h2>Create a recipe</h2>
      <TextInput
        style={{ width: '300px' }}
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        disabled={!isAuthenticated}
        isInvalid={error}
        onClear={() => {
          setError(false)
          setTitle('')
        }}
      />
      <Button onClick={onClick} text="Create" isSubmit={false} disabled={!isAuthenticated} />
    </Container>
  )
}
