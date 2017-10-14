import React, {Component} from 'react'
import axios from 'axios'
import './index.styl'

const ROOT_URL = 'https://conzorkingkongclock.herokuapp.com'

export default class TimeForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onButtonPress = this.onButtonPress.bind(this)
  }

  onFormSubmit (e) {
    e.preventDefault()
    const {_id, hours, minutes, seconds, ampm, days} = this.props
    if (days.length === 0) {
      this.setState({error: "You must select at least one day"})
      return
    }
    axios.post(`${ROOT_URL}/api/addtime`, {_id, hours, minutes, seconds, ampm, days})
      .then(res => {
        let {data} = res
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
        this.props.setClockState({
          _id: '',
          hours: "01",
          minutes: "00",
          seconds: "00",
          ampm: 'AM',
          days: [],
          error: ''
        })
        this.setState({error: ''})
      })
      .catch(err => {
        const {error, loggedIn} = err.response.data
        this.setState({error})
        this.props.setAppState({loggedIn})
      })
  }

  onButtonPress () {
    const {formClear} = this.props
    formClear()
    this.setState({error: ''})
  }

  render () {
    const {hours, minutes, seconds, ampm, days, error, _id, onNumberChange, onSelectChange, onCheckChange} = this.props
    return (
      <form className="time-form" onSubmit={this.onFormSubmit}>
        <p>{error}</p>
        <p>{this.state.error}</p>
        { _id !== '' && <button onClick={this.onButtonPress}>Cancel</button> }
          <div className="time-form-inputs">
            <div>
              <h5>Hours</h5>
              <input type="number" name="hours" min="01" max="12" onChange={onNumberChange} value={hours} />
            </div>
            <div>
              <h5>Minutes</h5>
              <input type="number" name="minutes" min="00" max="59" onChange={onNumberChange} value={minutes} />
            </div>
            <div>
              <h5>Seconds</h5>
              <input type="number" name="seconds" min="00" max="59" onChange={onNumberChange} value={seconds} />
            </div>
            <select name="ampm" value={ampm} onChange={onSelectChange} >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        <fieldset className="form-fieldset">
          <div>
            <input ref={d => {this.sunday = d}} onChange={onCheckChange} type="checkbox" name="sunday" value="0" checked={days.includes(0) && true}/>
            <label>Sunday</label>
          </div>
          <div>
            <input ref={d => {this.monday = d}} onChange={onCheckChange} type="checkbox" name="monday" value="1" checked={days.includes(1) && true} />
            <label>Monday</label>
          </div>
          <div>
            <input ref={d => {this.tuesday = d}} onChange={onCheckChange} type="checkbox" name="tuesday" value="2" checked={days.includes(2) && true} />
            <label>Tuesday</label>
          </div>
          <div>
            <input ref={d => {this.wednesday = d}} onChange={onCheckChange} type="checkbox" name="wednesday" value="3" checked={days.includes(3) && true} />
            <label>Wednesday</label>
          </div>
          <div>
            <input ref={d => {this.thursday = d}} onChange={onCheckChange} type="checkbox" name="thursday" value="4" checked={days.includes(4) && true} />
            <label>Thursday</label>
          </div>
          <div>
            <input ref={d => {this.friday = d}} onChange={onCheckChange} type="checkbox" name="friday" value="5" checked={days.includes(5) && true} />
            <label>Friday</label>
          </div>
          <div>
            <input ref={d => {this.saturday = d}} onChange={onCheckChange} type="checkbox" name="saturday" value="6" checked={days.includes(6) && true} />
            <label>Saturday</label>
          </div>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    )
  }
}