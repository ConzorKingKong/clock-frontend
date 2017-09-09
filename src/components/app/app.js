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

    const dayKey = {
      0: "sunday",
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday"
    }

    // TODO handle if else no worker
    this.worker = new Worker('loop.js')
    this.worker.onmessage = (e) => {
      if (e.data === null) {
        this.worker.postMessage(this.state.times)
      } else {
        const {day, hours, minutes, seconds, ampm} = e.data
        const alarmNotification = new Notification("Alarm Clock", {body: `Your alarm for ${hours}:${minutes}:${seconds} ${ampm} went off`})
        alert(`Alarm for ${dayKey[day]} at ${hours}:${minutes}:${seconds} ${ampm} happened!`)
        this.worker.postMessage(this.state.times)        
      }
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
    const {worker} = this
    const {loggedIn, times} = this.state
    // TODO if else to handle notification. if permission
    if (loggedIn) Notification.requestPermission()
    if (loggedIn) worker.postMessage(times)
    return (
      <div className='wrapper' style={{display: 'flex', flexDirection: 'column'}}>
        {!loggedIn && <div><Login setAppState={this.setAppState}/> <Register setAppState={this.setAppState} /></div> }
        {loggedIn && <div><Logout setAppState={this.setAppState} /><Clock times={times} setAppState={this.setAppState} /></div> }
      </div>
    )
  }
}