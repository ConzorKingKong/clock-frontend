import React, {Component} from 'react'
import Titlebar from '../titlebar'
import Login from '../login'
import Register from '../register'
import Logout from '../logout'
import Clock from '../clock'
import AlarmModal from '../alarmModal'
import axios from 'axios'
import loop from '!!file-loader!../../assets/loop.js'

const ROOT_URL = API_KEY || 'http://localhost:3000/api/'

import './index.styl'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loggedIn: false,
      times: [],
      date: new Date(),
      alarm: false,
      error: '',
      alarmTime: {}
    }
    
    this.cleanNums = this.cleanNums.bind(this)
    this.setAppState = this.setAppState.bind(this)
    this.notificationListener = this.notificationListener.bind(this)
  }

  componentDidMount () {
    axios.get(`${ROOT_URL}loginstatus`)
    .then(res => {
      const {loggedIn, times} = res.data
      this.setState({
        times,
        loggedIn
      })
    })
    .catch(err => {
      console.log("err getting login status", err)
    })

    const dayKey = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ]
    
    if (window.Worker) {
      this.worker = new Worker(loop)
      this.worker.onmessage = (e) => {
        const {date} = e.data
        this.setState({date})
        if (Object.keys(e.data).length === 1) {
          return
        } else {
          const {hours, minutes, seconds, ampm} = e.data.time
          const {day} = e.data
          const alarmTime = {...e.data.time, day: e.data.day}
          const alarmNotification = new Notification("Alarm Clock", {body: `Your alarm for ${hours}:${minutes}:${seconds} ${ampm} on ${dayKey[day]} went off`})
          this.setState({
            alarm: true,
            alarmTime
          })
        }
      }
  
      this.worker.onerror = (e) => {
        console.log("outside service worker error", e)
      }
      
      setInterval(() => {this.worker.postMessage(this.state.times)}, 1000)
    } else {
      this.setState({error: 'Alarms will only go off if this tab is active for the alarm time. Please upgrade to a new browser for the full experience.'})
    }

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

  cleanNums (num) {
    if (num.toString().length === 1) {
      num = `0${num}`
    }
    return num
  }

  render () {
    const {loggedIn, times, date, alarm, alarmTime, error} = this.state
    let displayHours = date.getHours()
    let displayMinutes = this.cleanNums(date.getMinutes())
    let displaySeconds = this.cleanNums(date.getSeconds())
    let displayAmpm = 'AM'
    
    if (displayHours === 12) {
      displayAmpm = 'PM'
    } else if (displayHours >= 13 && displayHours !== 24) {
      displayHours = displayHours - 12
      displayAmpm = 'PM'
    } else if (displayHours === 24) {
      displayHours = displayHours - 12
    }

    displayHours = this.cleanNums(displayHours)
    document.title = `Alarm Clock ${displayHours}:${displayMinutes}:${displaySeconds}${displayAmpm}`

    return (
      <div className='wrapper'>
        <Titlebar setAppState={this.setAppState} loggedIn={loggedIn}/>
        <h1>{error}</h1>
        <Clock
          times={times}
          date={date}
          setAppState={this.setAppState}
          loggedIn={loggedIn}
        />
        { alarm && <AlarmModal setAppState={this.setAppState} alarmTime={alarmTime} /> }
      </div>
    )
  }
}