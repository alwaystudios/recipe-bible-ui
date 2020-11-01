import { DinnerPlateIcon } from '@alwaystudios/as-ui-components'
import React from 'react'
import { TextWithIcon } from '../layout/TextWithIcon'

export const Servings: React.FunctionComponent<{ servings: number }> = ({ servings }) => (
  <TextWithIcon>
    <span>
      <DinnerPlateIcon />
    </span>
    <p>Serves {servings}</p>
  </TextWithIcon>
)
