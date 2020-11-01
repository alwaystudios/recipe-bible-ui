import React, { FunctionComponent } from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { Recipe } from './Recipe'
import { useApiRequest } from '../../hooks/useApiRequest'
import { getRecipes } from '../../apiClient'
import { CATEGORIES, RecipeList } from '@alwaystudios/recipe-bible-sdk'
import { WarningIcon } from '@alwaystudios/as-ui-components'
import { BeatLoader } from 'react-spinners'
import { RecipeGallery } from '../domain/RecipeGallery'

export const Recipes: FunctionComponent = () => {
  const match = useRouteMatch()
  const { data, error, loading } = useApiRequest<RecipeList>(getRecipes())
  const recipes = data || []
  const focusedRecipes = () => recipes.filter((r) => r.metadata.focused)
  const LATEST = 'Latest'

  const options: Record<string, (recipes: RecipeList) => RecipeList> = CATEGORIES.reduce(
    (acc, category) => {
      return { ...acc, [category]: () => recipes.filter((r) => r.categories.includes(category)) }
    },
    { [LATEST]: focusedRecipes },
  )

  return (
    <Switch>
      <Route path={`${match.path}/:recipe`}>
        <Recipe />
      </Route>
      <Route path={match.path}>
        <div className="flex-col rb-center">
          {error ? (
            <>
              <WarningIcon size="30px" />
              Failed to load recipe data
            </>
          ) : loading || !data ? (
            <BeatLoader />
          ) : (
            <RecipeGallery recipes={data} options={options} defaultOption={LATEST} />
          )}
        </div>
      </Route>
    </Switch>
  )
}
