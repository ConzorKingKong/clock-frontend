import React, {Component} from 'react'
import axios from 'axios'

export default class Logout extends Component {
  constructor (props) {
    super(props)

    this.onButtonClick = this.onButtonClick.bind(this)
  }
  
  onButtonClick () {
    axios.post("http://localhost:3000/api/signout")
      .then(res => {
        this.props.setAppState({loggedIn: false, times: []})
      })
  }

  render () {
    return (
      <button onClick={this.onButtonClick}>Logout</button>
    )
  }
}