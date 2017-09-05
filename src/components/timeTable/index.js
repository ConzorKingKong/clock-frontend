import React, {Component} from 'react'
import axios from 'axios'

export default class TimeTable extends Component {
  constructor (props) {
    super(props)
    
    this.deleteTime = this.deleteTime.bind(this)
    this.renderTables = this.renderTables.bind(this)
  }

  deleteTime (e) {
    const {id} = e.target
    // get id and post to database
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

    const timeKey = {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat"
    }

    return this.props.times.map((time, i) => {
      const {hours, minutes, seconds, ampm, _id, days} = time
      return (
        <div key={_id} style={{display: 'flex', flexDirection: 'row'}}>
          <p>{hours}:</p>
          <p>{minutes}:</p>
          <p>{seconds}</p>
          <p>{ampm}</p>
          <p>{days.map(day => {return `${dayKey[day]} `})}</p>
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

// 86400000 milliseconds in 24 hours
// 604800000 milliseconds in a week