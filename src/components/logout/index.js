import React, {Component} from 'react'
import axios from 'axios'
import './index.styl'

const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://conzorkingkongclock.herokuapp.com' : 'http://localhost:3000'

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