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
    this.timeLoop = this.timeLoop.bind(this)
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

  timeLoop () {
    const {times} = this.state
    if (times.length === 0) {
      window.requestAnimationFrame(this.timeLoop)
      return
    }
    times.forEach((time, timeIndex) => {
      const {minutes, seconds, days, ampm} = time
      let {hours} = time
      if (ampm === "pm" && hours !== 12) hours = hours + 12
      if (ampm === "am" && hours === 12) hours = 0
      if (hours !== new Date().getHours()) return
      if (minutes !== new Date().getMinutes()) return
      if (seconds !== new Date().getSeconds()) return
      days.forEach(day => {
        if (day !== new Date().getDay()) return
        console.log("ALARM HAPPENED ", day, ' ', time)
      })
    })
    window.requestAnimationFrame(this.timeLoop)
  }

  render () {
    window.requestAnimationFrame(this.timeLoop)
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