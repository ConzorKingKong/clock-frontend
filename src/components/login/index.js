import React, {Component} from 'react'
import axios from 'axios'

export default class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onInputChange (e) {
    const obj = {}
    obj[e.target.name] = e.target.value
    this.setState(obj)
  }

  onFormSubmit (e) {
    e.preventDefault()
    const {email, password} = this.state
    axios.post("http://localhost:3000/api/signin", {email, password})
      .then(res => {
        const {data} = res
        this.props.setAppState({
          loggedIn: data.loggedIn,
          times: data.times
        })
        this.setState({email: '', password: '', error: ''})
      })
      .catch(err => {
        console.log("login err ", err)
        const {data} = err.response
        this.props.setAppState({loggedIn: data.loggedIn})
        this.setState({email: '', password: '', error: data.error})
      })
  }

  render () {
    return (
    <form onSubmit={this.onFormSubmit}>
      <p>{this.state.error}</p>
      <h3>Login</h3>
      <input
        onChange={this.onInputChange}
        value={this.state.email}
        type="text"
        placeholder="Email"
        name="email" />

      <input
        onChange={this.onInputChange}
        value={this.state.password}
        type="password"
        placeholder="Password"
        name="password" />

      <button type="submit">Submit</button>
    </form>
    )
  }
}