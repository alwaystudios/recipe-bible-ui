import { Pill } from '@alwaystudios/as-ui-components'
import React from 'react'
import { RB_GREEN, RB_WHITE } from './colors'

export const Categories: React.FunctionComponent<{ categories: string[] }> = ({ categories }) => (
  <>
    {categories.map((c) => (
      <Pill key={c} backgroundColor={RB_GREEN} color={RB_WHITE} label={c} />
    ))}
  </>
)
