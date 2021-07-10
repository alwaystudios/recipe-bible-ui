import { ErrorIcon } from '@alwaystudios/as-ui-components'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { Advert } from '../components/Advert'
import { Spinner } from '../components/Spinner'
import { useAdverts } from '../hooks/useAdverts'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2rem;
`

const DeleteSpan = styled.span`
  position: absolute;
  top: -1rem;
  left: 100px;
  cursor: pointer;

  & > button {
    border-radius: 50%;
  }
`

const AdvertContainer = styled.div`
  position: relative;
`

export const ManageAdvertsPage: React.FC = () => {
  const { getAdverts, adverts, loading, deleteAdvert } = useAdverts()

  useEffect(() => {
    getAdverts()
  }, [])

  return (
    <Spinner isLoading={loading}>
      <h1>Adverts</h1>
      <Container>
        {adverts.map(({ src, href }) => (
          <AdvertContainer key={src}>
            <Advert src={src} href={href} />
            <DeleteSpan role="delete-advert-cta" onClick={() => deleteAdvert({ src, href })}>
              <ErrorIcon size="2rem" />
            </DeleteSpan>
          </AdvertContainer>
        ))}
      </Container>
    </Spinner>
  )
}
