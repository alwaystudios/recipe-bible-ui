import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

export const Recipe: FunctionComponent = () => {
  const { recipe } = useParams<{ recipe: any }>()
  return (
    <>
      <h3>{recipe}</h3>todo
    </>
  )
}
