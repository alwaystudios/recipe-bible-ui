import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../auth/AuthContext'
import { RB_LIGHT_GREEN } from '../colors'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: center;
`

const StyledLink = styled(Link)`
  border: 1px solid ${RB_LIGHT_GREEN};
  padding: 1rem;
`

export const links = [
  { to: '/recipes', text: 'recipes' },
  { to: '/manage/recipes', text: 'manage recipes' },
  { to: '/manage/recipes/create', text: 'new recipe' },
  { to: '/ingredients', text: 'ingredients' },
  { to: '/manage/ingredients', text: 'manage ingredients' },
  { to: '/manage/ingredients/create', text: 'new ingredient' },
  { to: '/manage/adverts', text: 'manage adverts' },
  { to: '/manage/adverts/create', text: 'new advert' },
  { to: '/manage/ratings', text: 'manage ratings' },
]

export const AdminMenu: React.FC = () => {
  const { user } = useAuthContext()

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <Container>
      {links.map(({ to, text }) => (
        <StyledLink key={to} to={to}>
          {text}
        </StyledLink>
      ))}
    </Container>
  )
}
