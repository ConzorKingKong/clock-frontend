import React, {Component} from 'react'
import axios from 'axios'
import './index.styl'

export default class TimeTable extends Component {
  constructor (props) {
    super(props)
    
    this.deleteTime = this.deleteTime.bind(this)
    this.renderTables = this.renderTables.bind(this)
  }

  deleteTime (e) {
    const {id} = e.target
    axios.post("http://localhost:3000/api/deletetime", {id})
      .then(res => {
        const {times} = res.data.value
        this.props.setAppState({
          times
        })
      })
      .catch( err => {
        console.log("err ", err)
      })
  }

  renderTables () {
    const dayKey = {
      0: "sunday",
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday"
    }

    return this.props.times.map((time, i) => {
      const {_id, hours, minutes, seconds, ampm, days} = time
      return (
        <div key={_id} className="time-table">
          <p>{hours}:{minutes}:{seconds} {ampm} {days.map(day => {return `${dayKey[day]} `})}</p>
          <button id={_id} data-_id={_id} data-hours={hours} data-minutes={minutes} data-seconds={seconds} data-ampm={ampm} data-days={days} onClick={this.props.editTime}>Edit</button>
          <button id={_id} onClick={this.deleteTime}>Delete</button>
        </div>
      )
    })
  }
  
  render () {
    return (
      <div>
        {this.renderTables()}
      </div>
    )
  }
}