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
        console.log(times)
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