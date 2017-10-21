import React, {Component} from 'react'
import axios from 'axios'
import './index.styl'

const ROOT_URL = API_URL || 'http://localhost:3000/api/'

export default class Logout extends Component {
  constructor (props) {
    super(props)

    this.onButtonClick = this.onButtonClick.bind(this)
  }
  
  onButtonClick () {
    axios.post(`${ROOT_URL}signout`)
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