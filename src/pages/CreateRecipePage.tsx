import { Button, TextInput } from '@alwaystudios/as-ui-components'
import { kebabify } from '@alwaystudios/recipe-bible-sdk'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { useRecipes } from '../hooks/useRecipes'

export const CreateRecipePage: React.FC = () => {
  const history = useHistory()
  const [error, setError] = useState(false)
  const [title, setTitle] = useState<string>('')
  const { createRecipe } = useRecipes()
  const { tokens } = useContext(AuthContext)

  const handleOnClick = () =>
    createRecipe(tokens?.idToken || '', title)
      .then(() => history.push(kebabify(`recipes/${title.toLocaleLowerCase()}`)))
      .catch(() => setError(true))

  return (
    <form
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault()
        if (title) {
          handleOnClick()
        }
      }}
    >
      <h1>Create a new recipe</h1>
      <TextInput
        isInvalid={error}
        autoFocus={true}
        id="title"
        onChange={(e) => {
          setTitle(e.currentTarget.value)
          setError(false)
        }}
        value={title}
        placeholder="Fast and furious fish and chips"
      />
      {error && <p>Recipe already exists</p>}
      <Button onClick={handleOnClick} text="create" disabled={!title} />
    </form>
  )
}
