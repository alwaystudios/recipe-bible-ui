import { RecipeRating, toSlug } from '@alwaystudios/recipe-bible-sdk'
import { pathOr, sum } from 'ramda'
import { useState } from 'react'
import request from 'superagent'
import { API_BASE_URL } from '../contstants'

export type UseRatings = {
  getAllRatings: () => Promise<void>
  getRatings: (title: string) => Promise<void>
  setRating: (title: string, rating: number) => Promise<void>
  ratings: number[]
  rating: number
  allRatings: RecipeRating[]
}

export const useRatings = (): UseRatings => {
  const [ratings, setRatings] = useState<number[]>([])
  const [myRating, setMyRating] = useState<number | undefined>(undefined)
  const [allRatings, setAllRatings] = useState<RecipeRating[]>([])

  const getRatings = async (title: string) => {
    if (!title) {
      return
    }

    await request
      .get(`${API_BASE_URL}/recipe-ratings/${toSlug(title)}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => setRatings(pathOr<number[]>(undefined, ['body', 'data'], res)))
      .catch(() => setRatings([]))
  }

  const getAllRatings = async () =>
    request
      .get(`${API_BASE_URL}/recipe-ratings`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => setAllRatings(pathOr<RecipeRating[]>([], ['body', 'data'], res)))
      .catch(() => setAllRatings([]))

  const setRating = async (title: string, rating: number) => {
    if (!title) {
      return
    }

    setMyRating(rating)

    await request
      .post(`${API_BASE_URL}/recipe-ratings/${toSlug(title)}`)
      .send({ rating })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .catch(() => setMyRating(undefined))
  }

  return {
    allRatings,
    ratings,
    rating: myRating ? myRating : ratings.length ? sum(ratings) / ratings.length : undefined,
    getRatings,
    getAllRatings,
    setRating,
  }
}
