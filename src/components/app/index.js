import React, {Component} from 'react'
import Titlebar from '../titlebar'
import Login from '../login'
import Register from '../register'
import Logout from '../logout'
import Clock from '../clock'
import axios from 'axios'
import gong from '../../assets/gong.mp3'
import loop from '!!file-loader!../../assets/loop.js'

import './app.styl'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loggedIn: false,
      times: [],
      date: new Date(),
      alarm: false
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
    
    this.onButtonClick = this.onButtonClick.bind(this)
    this.setAppState = this.setAppState.bind(this)
    
    // TODO handle if else no worker
    // TODO find how multiple workers spawn(?)
    
    
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
    
    this.worker = new Worker(loop)
    this.worker.onmessage = (e) => {
      this.setState({date: e.data.date})
      if (Object.keys(e.data).length === 1) {
        setTimeout(() => {this.worker.postMessage(this.state.times)}, 250)
        // this.worker.postMessage(this.state.times)
      } else {
        console.log(e.data)
        const {hours, minutes, seconds, ampm} = e.data.time
        const {day} = e.data
        const alarmNotification = new Notification("Alarm Clock", {body: `Your alarm for ${hours}:${minutes}:${seconds} ${ampm} on ${dayKey[day]} went off`})
        setTimeout(() => {this.worker.postMessage(this.state.times)}, 1000)
        this.setState({
          alarm: true
        })
      }
    }
    
    this.worker.postMessage(this.state.times)
    
  }
  
  componentWillUnmount () {
    this.worker.terminate()
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
    // TODO if else to handle notification. if permission
    if (loggedIn) Notification.requestPermission()
    return (
      <div className='wrapper' style={{display: 'flex', flexDirection: 'column'}}>
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