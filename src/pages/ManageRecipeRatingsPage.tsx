import { recipeTitleTransformer } from '@alwaystudios/recipe-bible-sdk'
import React, { useEffect } from 'react'
import { useRatings } from '../hooks/useRatings'

export const ManageRecipeRatingsPage: React.FC = () => {
  const { getAllRatings, allRatings } = useRatings()

  useEffect(() => {
    getAllRatings()
  }, [])

  return (
    <>
      <h1>Recipe ratings</h1>
      <ul>
        {allRatings.map(({ title, rating }) => (
          <li key={title}>
            {recipeTitleTransformer(title)} - {rating}
          </li>
        ))}
      </ul>
    </>
  )
}
