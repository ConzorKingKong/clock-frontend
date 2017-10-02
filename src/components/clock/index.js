import React, {Component} from 'react'
import axios from 'axios'
import TimeTable from '../timeTable'
import TimeForm from '../timeForm'

import './clock.css'

export default class Clock extends Component {
  constructor (props) {
    super(props)

    this.state = {
      _id: '',
      hours: "01",
      minutes: "00",
      seconds: "00",
      ampm: 'am',
      days: [],
      error: ''
    }
    this.onNumberChange = this.onNumberChange.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.editTime = this.editTime.bind(this)
    this.setClockState = this.setClockState.bind(this)
    this.onCheckChange = this.onCheckChange.bind(this)
    this.cleanNums = this.cleanNums.bind(this)
  }

  setClockState (e) {
    this.setState(e)
  }

  onNumberChange (e) {
    const obj = {}
    const {name, value} = e.target
    let newValue = value
    if (newValue.length === 1) newValue = `0${newValue}`
    obj[name] = newValue
    this.setState(obj)
  }

  onSelectChange (e) {
    const obj = {}
    obj[e.target.name] = e.target.value
    this.setState(obj)
  }

  onCheckChange (e) {
    const {days} = this.state
    const {checked, value} = e.target
    const parsedValue = parseInt(value)
    if (checked) {
      this.setState({days: [...days, parsedValue]})
    } else {
      const newDays = days.filter(i => {return i !== parsedValue})
      this.setState({
        days: newDays
      })
    }
  }

  editTime (e) {
    const {_id, hours, minutes, seconds, ampm, days} = e.target.dataset
    const newDays = days.split(',').map(day => {return parseInt(day)})
    this.setState({
      _id,
      hours,
      minutes,
      seconds,
      ampm,
      days: newDays
    })

  }

  cleanNums (num) {
    if (num.toString().length === 1) {
      num = `0${num}`
    }
    return num
  }

  render () {
    const {_id, hours, minutes, seconds, ampm, days} = this.state
    const {loggedIn, date} = this.props
    const daysKey = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"]

    const day = date.getDay()
    const month = this.cleanNums(date.getMonth() + 1)
    const dateOfMonth = this.cleanNums(date.getDate())
    const year = date.getFullYear()
    const clockMinutes = this.cleanNums(date.getMinutes())
    const clockSeconds = this.cleanNums(date.getSeconds())
    let clockHours = date.getHours()
    let clockAmpm = 'AM'

    if (clockHours === 12) {
      clockAmpm = 'PM'
    } else if (clockHours >= 13 && clockHours !== 24) {
      clockHours = clockHours - 12
      clockAmpm = 'PM'
    } else if (clockHours === 24) {
      clockHours = clockHours - 12
    }

    clockHours = this.cleanNums(clockHours)

    return (
      <div>
        <div style={{position: 'absolute', top: '50%', left: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <p>{daysKey[day]} {month}-{dateOfMonth}-{year}</p>
          <p>{clockHours}:{clockMinutes}:{clockSeconds} {clockAmpm}</p>
        </div>
        { loggedIn && <TimeTable
                        setAppState={this.props.setAppState}
                        times={this.props.times}
                        editTime={this.editTime}
                        /> }
        { loggedIn && <TimeForm
                        setAppState={this.props.setAppState}
                        setClockState={this.setClockState}
                        onCheckChange={this.onCheckChange}
                        onSelectChange={this.onSelectChange}
                        onNumberChange={this.onNumberChange}
                        _id={_id}
                        hours={hours}
                        minutes={minutes}
                        seconds={seconds}
                        ampm={ampm}
                        days={days}
                      /> }
      </div>
    )
  }
}