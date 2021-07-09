import { Advert as AdvertType } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useAdverts } from '../hooks/useAdverts'
import { Advert } from './Advert'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  margin: 2rem 0;
`

const top3 = (adverts: AdvertType[]): AdvertType[] => adverts.slice(0, 3)

const shuffle = (adverts: AdvertType[]): AdvertType[] =>
  adverts
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

const getRandomTop3 = (adverts: AdvertType[]): AdvertType[] => top3(shuffle(adverts))

export const Adverts: React.FC = () => {
  const { getAdverts, adverts } = useAdverts()

  useEffect(() => {
    getAdverts()
  }, [])

  return adverts ? (
    <Container>
      {getRandomTop3(adverts).map(({ src, href }, index) => (
        <Advert key={index} src={src} href={href} />
      ))}
    </Container>
  ) : null
}
