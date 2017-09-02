import React, {Component} from 'react'
import Login from '../login'
import Register from '../register'
import Logout from '../logout'
import Clock from '../clock'
import axios from 'axios'

import './app.styl'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loggedIn: false,
      times: []
    }

    this.setAppState = this.setAppState.bind(this)
  }

  componentWillMount () {
    axios.get('http://localhost:3000/api/loginstatus')
    .then(res => {
      const {loggedIn, times} = res.data
      this.setState({
        times,
        loggedIn
      })
    })
    .catch(err => {
      console.log("app error ", err)
    })
  }

  setAppState (e) {
    this.setState(e)
  }

  render () {
    const {loggedIn, times} = this.state
    return (
      <div className='wrapper' style={{display: 'flex', flexDirection: 'column'}}>
        {!loggedIn && <div><Login setAppState={this.setAppState}/> <Register setAppState={this.setAppState} /></div> }
        <Logout setAppState={this.setAppState} />
        {loggedIn && <div><Logout setAppState={this.setAppState} /><Clock times={times} setAppState={this.setAppState} /></div> }
      </div>
    )
  }
}
