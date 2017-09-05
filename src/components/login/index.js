import React, {Component} from 'react'
import axios from 'axios'

export default class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onInputChange (e) {
    const obj = {}
    obj[e.target.name] = e.target.value
    this.setState(obj)
  }

  onFormSubmit (e) {
    e.preventDefault()
    const {email, password} = this.state
    axios.post("http://localhost:3000/api/signin", {email, password})
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
        this.props.setAppState({
          loggedIn,
          times
        })
        this.setState({email: '', password: '', error: ''})
      })
      .catch(err => {
        console.log("login err ", err)
        const {data} = err.response
        this.props.setAppState({loggedIn: data.loggedIn})
        this.setState({email: '', password: '', error: data.error})
      })
  }

  render () {
    return (
    <form onSubmit={this.onFormSubmit}>
      <p>{this.state.error}</p>
      <h3>Login</h3>
      <input
        onChange={this.onInputChange}
        value={this.state.email}
        type="text"
        placeholder="Email"
        name="email" />

      <input
        onChange={this.onInputChange}
        value={this.state.password}
        type="password"
        placeholder="Password"
        name="password" />

      <button type="submit">Submit</button>
    </form>
    )
  }
}