import { Button, TextInput } from '@alwaystudios/as-ui-components'
import { testRecipe } from '@alwaystudios/recipe-bible-sdk'
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
  const [recipeName, setRecipeName] = useState<string>('')
  const { isAuthenticated } = useAuth0()
  const { accessToken, isLoading } = useAccessToken()
  const history = useHistory()
  const [error, setError] = useState<boolean>(false)

  const onClick = async (event: React.MouseEvent) => {
    event.preventDefault()
    if (recipeName.length === 0) {
      setError(true)
      return
    }
    setError(false)
    return postCreateRecipe(testRecipe(recipeName), accessToken)
      .then(() => {
        history.push(`/recipes/${recipeName}`)
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
        value={recipeName}
        onChange={(event) => setRecipeName(event.currentTarget.value)}
        disabled={!isAuthenticated}
        isInvalid={error}
        onClear={() => {
          setError(false)
          setRecipeName('')
        }}
      />
      <Button onClick={onClick} text="Create" isSubmit={false} disabled={!isAuthenticated} />
    </Container>
  )
}
