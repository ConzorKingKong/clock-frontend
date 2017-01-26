import './index.styl'

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers/index'
import promise from 'redux-promise'
import {Provider} from 'react-redux'
import routes from './routes'

const preStore = applyMiddleware(promise)(createStore)
export const store = preStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
    , document.querySelector('.container'))
