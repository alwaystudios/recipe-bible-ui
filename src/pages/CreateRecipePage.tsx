import { Button, TextInput } from '@alwaystudios/as-ui-components'
import { kebabify, toSlug } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecipes } from '../hooks/useRecipes'

const StyledButton = styled(Button)`
  width: 100%;
`

export const CreateRecipePage: React.FC = () => {
  const history = useHistory()
  const [title, setTitle] = useState<string>('')
  const { createRecipe, authError, recipe, error, clearErrors } = useRecipes()

  useEffect(() => {
    if (authError) {
      history.push('/account')
    }
  }, [authError])

  useEffect(() => {
    if (recipe?.title) {
      history.push(kebabify(`/manage/recipes/${toSlug(recipe.title)}`))
    }
  }, [recipe])

  const handleOnClick = () => createRecipe(title)

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
          clearErrors()
        }}
        value={title}
        placeholder="Fast and furious fish and chips"
      />
      {error && <p>Recipe already exists</p>}
      <StyledButton onClick={handleOnClick} text="create" disabled={!title} />
    </form>
  )
}
