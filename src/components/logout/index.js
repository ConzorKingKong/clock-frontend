import React, {Component} from 'react'
import axios from 'axios'
import './index.styl'

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
      <button className="logout-button" onClick={this.onButtonClick}>Logout</button>
    )
  }
}