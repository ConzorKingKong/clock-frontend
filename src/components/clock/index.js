import React, {Component} from 'react'
import axios from 'axios'
import TimeTable from '../timeTable'
import TimeForm from '../timeForm'

export default class Clock extends Component {
  constructor (props) {
    super(props)

    this.state = {
      place: 'holder'
    }
  }

  render () {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <TimeTable times={this.props.times} />
        <TimeForm setAppState={this.props.setAppState} />
      </div>
    )
  }
}