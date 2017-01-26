import React from 'react'
import {Route} from 'react-router'

import App from './components/app/app'
import FourZeroFour from './components/404/404'

export default (
  <Route path='/' component={App}>
    <Route path='*' component={FourZeroFour} />
  </Route>
)
