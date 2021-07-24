import { Advert } from '@alwaystudios/recipe-bible-sdk'
import { pathOr } from 'ramda'
import { useState } from 'react'
import request from 'superagent'
import { useAuthContext } from '../auth/AuthContext'
import { API_BASE_URL } from '../constants'

export type UseAdverts = {
  getAdverts: () => Promise<void>
  saveAdvert: (advert: Advert) => Promise<void>
  deleteAdvert: (advert: Advert) => Promise<void>
  adverts: Advert[]
  loading: boolean
}

// todo: handle auth errors here and in management page
export const useAdverts = (): UseAdverts => {
  const { tokens } = useAuthContext()
  const idToken = pathOr(undefined, ['idToken'], tokens)
  const [loading, setLoading] = useState<boolean>(false)

  const [adverts, setAdverts] = useState<Advert[]>([])

  const getAdverts = (): Promise<void> => {
    setLoading(true)
    return request
      .get(`${API_BASE_URL}/adverts`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => setAdverts(pathOr<Advert[]>([], ['body', 'data'], res)))
      .catch(() => setAdverts([]))
      .finally(() => setLoading(false))
  }

  const saveAdvert = async (advert: Advert): Promise<void> => {
    await request
      .put(`${API_BASE_URL}/adverts`)
      .send(advert)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${idToken}`)
  }

  const deleteAdvert = async (advert: Advert): Promise<void> => {
    await request
      .delete(`${API_BASE_URL}/adverts`)
      .send(advert)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${idToken}`)
      .then(() => setAdverts(adverts.filter(({ src }) => src !== advert.src)))
  }

  return {
    getAdverts,
    saveAdvert,
    deleteAdvert,
    adverts,
    loading,
  }
}
