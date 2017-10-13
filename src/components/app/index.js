import React, {Component} from 'react'
import Titlebar from '../titlebar'
import Login from '../login'
import Register from '../register'
import Logout from '../logout'
import Clock from '../clock'
import axios from 'axios'
import gong from '../../assets/gong.mp3'
import loop from '!!file-loader!../../assets/loop.js'

import './index.styl'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loggedIn: false,
      times: [],
      date: new Date(),
      alarm: false
    }

    const dayKey = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ]
    
    this.onButtonClick = this.onButtonClick.bind(this)
    this.setAppState = this.setAppState.bind(this)
    this.notificationListener = this.notificationListener.bind(this)
  }

  componentDidMount () {
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
    
    // TODO handle if else no worker
    
    this.worker = new Worker(loop)
    this.worker.onmessage = (e) => {
      this.setState({date: e.data.date})
      if (Object.keys(e.data).length === 1) {
        return
      } else {
        console.log(e.data)
        const {hours, minutes, seconds, ampm} = e.data.time
        const {day} = e.data
        const alarmNotification = new Notification("Alarm Clock", {body: `Your alarm for ${hours}:${minutes}:${seconds} ${ampm} on ${dayKey[day]} went off`})
        this.setState({
          alarm: true
        })
      }
    }

    this.worker.onerror = (e) => {
      console.log("outside service worker error", e)
    }
    
    setInterval(() => {this.worker.postMessage(this.state.times)}, 250)

    if ("Notification" in window) {
      document.body.addEventListener("click", this.notificationListener)
    }
  }
  
  componentWillUnmount () {
    this.worker.terminate()
    document.body.removeEventListener(this.notificationListener)
  }

  notificationListener () {
    if (this.state.loggedIn && (Notification.permission !== 'denied' || Notification.permission === 'default')) Notification.requestPermission()
  }

  setAppState (e) {
    this.setState(e)
  }

  onButtonClick (e) {
    e.preventDefault()
    this.setState({alarm: false})
  }

  render () {
    const {loggedIn, times, date, alarm} = this.state
    return (
      <div className='wrapper'>
        <Titlebar setAppState={this.setAppState} loggedIn={loggedIn}/>
        <Clock
          times={times}
          date={date}
          setAppState={this.setAppState}
          loggedIn={loggedIn}
        />
        { alarm && <div><audio src={gong} autoPlay loop/> <button onClick={this.onButtonClick}>■</button></div> }
      </div>
    )
  }
}