import { Button, TextInput } from '@alwaystudios/as-ui-components'
import { kebabify, toSlug } from '@alwaystudios/recipe-bible-sdk'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BackToLink } from '../components/BackToLink'
import { useRecipes } from '../hooks/useRecipes'

export const CreateRecipePage: React.FC = () => {
  const history = useHistory()
  const [error, setError] = useState(false)
  const [title, setTitle] = useState<string>('')
  const { createRecipe } = useRecipes()

  const handleOnClick = () =>
    createRecipe(title)
      .then(() => history.push(kebabify(`/manage/recipes/${toSlug(title)}`)))
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
      <BackToLink to="/manage/recipes" text="manage recipes" />
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
