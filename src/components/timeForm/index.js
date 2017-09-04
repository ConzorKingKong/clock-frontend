import React, {Component} from 'react'
import axios from 'axios'

export default class TimeForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hours: "01",
      minutes: "00",
      seconds: "00",
      ampm: 'am',
      days: [],
      error: ''
    }
    this.onNumberChange = this.onNumberChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.onCheckChange = this.onCheckChange.bind(this)
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

  onFormSubmit (e) {
    e.preventDefault()
    const {hours, minutes, seconds, ampm, days} = this.state
    if (days.length === 0) {
      this.setState({error: "You must select at least one day"})
      return
    }
    axios.post("http://localhost:3000/api/addtime", {hours: parseInt(hours), minutes: parseInt(minutes), seconds: parseInt(seconds), ampm, days})
      .then(res => {
        const {data} = res
        this.props.setAppState({
          times: data
        })
        const dayButtons = [
          this.sunday,
          this.monday,
          this.tuesday,
          this.wednesday,
          this.thursday,
          this.friday,
          this.saturday
        ]
        dayButtons.forEach(day => {
          if (day.checked) day.checked = false
        })
        this.setState({
          hours: "01",
          minutes: "00",
          seconds: "00",
          ampm: 'am',
          days: [],
          error: ''
        })
      })

      .catch(err => {
        console.log("time form err ", err)
      })
  }

  render () {
    const {hours, minutes, seconds, ampm, days, error} = this.state
    return (
      <form onSubmit={this.onFormSubmit}>
        <p>{error}</p>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <h5>Hours</h5>
            <h5>Minutes</h5>
            <h5>Seconds</h5>
          </div>
          <div>
            <input type="number" name="hours" min="01" max="12" onChange={this.onNumberChange} value={hours} />
            <input type="number" name="minutes" min="00" max="59" onChange={this.onNumberChange} value={minutes} />
            <input type="number" name="seconds" min="00" max="59" onChange={this.onNumberChange} value={seconds} />
          </div>
        </div>
        <select name="ampm" value={ampm} onChange={this.onSelectChange} >
          <option value="am">AM</option>
          <option value="pm">PM</option>
        </select>
        <fieldset>
          <div>
            <input ref={d => {this.sunday = d}} onChange={this.onCheckChange} type="checkbox" name="sunday" value="0" />
            <label>Sunday</label>
          </div>
          <div>
            <input ref={d => {this.monday = d}} onChange={this.onCheckChange} type="checkbox" name="monday" value="1" />
            <label>Monday</label>
          </div>
          <div>
            <input ref={d => {this.tuesday = d}} onChange={this.onCheckChange} type="checkbox" name="tuesday" value="2" />
            <label>Tuesday</label>
          </div>
          <div>
            <input ref={d => {this.wednesday = d}} onChange={this.onCheckChange} type="checkbox" name="wednesday" value="3" />
            <label>Wednesday</label>
          </div>
          <div>
            <input ref={d => {this.thursday = d}} onChange={this.onCheckChange} type="checkbox" name="thursday" value="4" />
            <label>Thursday</label>
          </div>
          <div>
            <input ref={d => {this.friday = d}} onChange={this.onCheckChange} type="checkbox" name="friday" value="5" />
            <label>Friday</label>
          </div>
          <div>
            <input ref={d => {this.saturday = d}} onChange={this.onCheckChange} type="checkbox" name="saturday" value="6" />
            <label>Saturday</label>
          </div>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    )
  }
}