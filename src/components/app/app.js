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
      const {loggedIn} = res.data
      let {times} = res.data
      times.forEach(time => {
        const {minutes, seconds, ampm} = time
        let {hours} = time
        time.milliseconds = []
        if (ampm === "pm" && hours !== 12) hours = hours + 12
        if (ampm === "am" && hours === 12) hours = 0
        time.days.forEach(day => {
          const now = new Date()
          if (now.getDay() < day) {
            const baseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds)
            const daysOut = Math.abs(day - now.getDay())
            const alarmTime = baseTime.getTime() + (86400000 * daysOut)
            time.milliseconds.push(alarmTime)
          } else if (now.getDay() > day) {
            const baseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds)
            const daysOut = 7 - (now.getDay() - day)
            const alarmTime = baseTime.getTime() + (86400000 * daysOut)
            time.milliseconds.push(alarmTime)
          } else if (now.getDay() === day) {
            let baseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds)
            if (new Date().getTime() > baseTime.getTime()) {
              baseTime = baseTime.getTime() + 604800000
              time.milliseconds.push(baseTime)
            } else {
              time.milliseconds.push(baseTime.getTime())
            }
          }
        })
      })
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
      // fix adding 12 hours for pm if hours === 12
      time.milliseconds.forEach((milli, milliIndex) => {
        if (new Date().getTime() >= milli) {
          console.log("ALARM!!!")
          const newMillies = [].concat(time.milliseconds)
          newMillies[milliIndex] = newMillies[milliIndex] + 604800000
          const newTimes = [...times]
          console.log("new times ", newTimes)
          newTimes[timeIndex].milliseconds = newMillies
          console.log("new times after edits ", newTimes)
          this.setState({
            times: newTimes
          })
        }
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

// 86400000 milliseconds in 24 hours
// 604800000 milliseconds in a week