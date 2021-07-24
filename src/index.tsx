import './css/global.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './components/App'
import ReactGA from 'react-ga'
import { GA_TAG, IS_OFFLINE } from './constants'

if (!IS_OFFLINE) {
  ReactGA.initialize(GA_TAG)
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
