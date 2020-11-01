import React from 'react'

export const Story: React.FunctionComponent<{ story: string }> = ({ story }) => {
  return <p>{story}</p>
}
