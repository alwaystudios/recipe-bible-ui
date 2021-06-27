import { Button, Tab, Tabs } from '@alwaystudios/as-ui-components'
import { Recipe, toSlug } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { fromRecipeApi } from '../domain/recipeTransformer'
import { RecipeImageForm } from './RecipeImageForm'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`

type Props = {
  recipe: Recipe
  updateRecipe: (updates: DeepPartial<Recipe>) => Promise<void>
  deleteRecipe: (title: string) => Promise<void>
}

export const RecipeForm: React.FC<Props> = ({ recipe, updateRecipe, deleteRecipe }) => {
  const {
    title,
    imgSrc,
    metadata: { published, focused },
  } = fromRecipeApi(recipe)
  const history = useHistory()

  const handleUpdateRecipe = (updates: DeepPartial<Recipe>) => updateRecipe(updates)

  return (
    <Container>
      <h1>{title}</h1>
      <Link to={`/recipes/${toSlug(title)}`}>view</Link>
      <Button
        text="delete"
        onClick={() => deleteRecipe(toSlug(title)).then(() => history.push('/manage/recipes'))}
      />
      <Button
        text={published ? 'unpublish' : 'publish'}
        onClick={() => handleUpdateRecipe({ metadata: { published: !published } })}
        disabled={focused}
      />
      {published && (
        <Button
          text={focused ? 'unfocus' : 'focus'}
          onClick={() => handleUpdateRecipe({ metadata: { focused: !focused } })}
        />
      )}
      <Tabs>
        <Tab title="Photo">
          <RecipeImageForm
            title={title}
            imgSrc={imgSrc}
            setImgSrc={(imgSrc: string) => handleUpdateRecipe({ imgSrc })}
          />
        </Tab>
        <Tab title="Steps">
          <>todo</>
        </Tab>
      </Tabs>
    </Container>
  )
}
