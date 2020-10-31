import React from 'react'

type ComponentProps = {
  className?: string
} & React.HTMLProps<HTMLAnchorElement>

export const ExternalLink: React.FunctionComponent<ComponentProps> = ({
  className,
  children,
  ...props
}) => (
  <a className={className} {...props} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)
