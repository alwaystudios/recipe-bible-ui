import React from 'react'

export const ExternalLink: React.FunctionComponent<React.HTMLProps<HTMLAnchorElement>> = ({
  children,
  ...props
}) => (
  <a {...props} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)
