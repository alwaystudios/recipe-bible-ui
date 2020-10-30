import { useAsync } from '@alwaystudios/as-ui-components'
import { useEffect } from 'react'
import { SuperAgentRequest } from 'superagent'

// todo: move to ui libs and create type for State<T>
export const useApiRequest = <T>(
  request: SuperAgentRequest,
): {
  data: T | null
  loading: boolean
  error: boolean
  called: boolean
} => {
  const { callback, state } = useAsync(
    async (): Promise<T> => await request.then(({ body }) => body),
  )

  useEffect(() => {
    callback()
  }, [])

  return state
}
