import { useAsync } from '@alwaystudios/as-ui-components'
import { useEffect } from 'react'

// todo: move to ui libs and create type for State<T>
export const useEffectAsync = <T>(
  f: () => Promise<T>,
): {
  data: T | null
  loading: boolean
  error: boolean
  called: boolean
} => {
  const { callback, state } = useAsync(f)

  useEffect(() => {
    callback()
  }, [])

  return state
}
