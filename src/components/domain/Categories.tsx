import React from 'react'
import styled from 'styled-components'

const Tag = styled.div`
  color: green;
`

export const Categories: React.FunctionComponent<{ categories: string[] }> = ({ categories }) => (
  <>
    {categories.map((c) => (
      <Tag key={c}>{c}</Tag>
    ))}
  </>
)
