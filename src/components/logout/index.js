import React, {Component} from 'react'
import axios from 'axios'
import './index.styl'

const ROOT_URL = 'https://conzorkingkongclock.herokuapp.com'

export default class Logout extends Component {
  constructor (props) {
    super(props)

    this.onButtonClick = this.onButtonClick.bind(this)
  }
  
  onButtonClick () {
    axios.post(`${ROOT_URL}/api/signout`)
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