import ReactGA from 'react-ga'
import { IS_OFFLINE } from '../constants'

export type UseAnalytics = {
  pageView: () => void
  pageEvent: (event: ReactGA.EventArgs) => void
  timing: (timing: ReactGA.TimingArgs) => void
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAnalytics = () => {
  const pageView = (): void => {
    if (!IS_OFFLINE) {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
  }

  const pageEvent = (event: ReactGA.EventArgs): void => {
    if (!IS_OFFLINE) {
      ReactGA.event(event)
    }
  }

  const timing = (timing: ReactGA.TimingArgs): void => {
    if (!IS_OFFLINE) {
      ReactGA.timing(timing)
    }
  }

  return {
    pageView,
    pageEvent,
    timing,
  }
}
