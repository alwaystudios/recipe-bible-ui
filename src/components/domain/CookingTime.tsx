import { ClockIcon } from '@alwaystudios/as-ui-components'
import React from 'react'
import { TextWithIcon } from '../layout/TextWithIcon'

export const CookingTime: React.FunctionComponent<{
  cookingTime: string
}> = ({ cookingTime }) => (
  <TextWithIcon>
    <span>
      <ClockIcon />
    </span>
    <p>{cookingTime}</p>
  </TextWithIcon>
)
