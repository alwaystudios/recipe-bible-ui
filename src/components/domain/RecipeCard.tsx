import { Recipe } from '@alwaystudios/recipe-bible-sdk'
import React, { FunctionComponent } from 'react'
import { Info } from './Info'
import { RecipeImage } from './RecipeImage'

type Props = {
  recipe: Recipe
}

export const RecipeCard: FunctionComponent<Props> = ({ recipe }) => {
  const { servings, cookingTime, imgSrc, categories } = recipe
  return (
    <div className="recipe-card">
      <RecipeImage src={imgSrc} size="medium" />
      <div style={{ marginLeft: '1rem' }}>
        <Info categories={categories} servings={servings} cookingTime={cookingTime} />
      </div>
    </div>
  )
}
