import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const MenuLink = styled.div`
  color: white;
  cursor: pointer;
  font-weight: bold;
  padding: 1.2rem;

  &:hover {
    color: black;
    background-color: pink;
  }
`

type ComponentProps = {
  title: string
  location: string
}

export const NavMenuItem: React.FunctionComponent<ComponentProps> = ({ title, location }) => {
  const history = useHistory()

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    history.push(location)
  }

  return <MenuLink onClick={handleClick}>{title}</MenuLink>
}
