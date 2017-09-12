import React, {Component} from 'react'
import axios from 'axios'

export default class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: '',
      errorEmail: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onInputBlur = this.onInputBlur.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onInputChange (e) {
    const {name, value} = e.target
    const obj = {}
    obj[name] = value
    this.setState(obj)
  }

  onInputBlur (e) {
    const {name, value} = e.target
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const emailRegex = /\S+@\S+\.\S+/
    const obj = {}
    obj[`error${capitalize(name)}`] = ''    
    if (name === 'email') {
      if (!emailRegex.test(value) && value !== '') obj[`error${capitalize(name)}`] = 'Email is not valid'
    }
    this.setState(obj)
  }

  onFormSubmit (e) {
    e.preventDefault()
    const {email, password} = this.state
    axios.post("http://localhost:3000/api/signin", {email, password})
      .then(res => {
        const {loggedIn, times} = res.data
        this.props.setAppState({
          loggedIn,
          times
        })
        this.setState({email: '', password: '', error: ''})
      })
      .catch(err => {
        const {data} = err.response
        this.props.setAppState({loggedIn: data.loggedIn})
        this.setState({
          email: '',
          password: '',
          error: data.error
        })
      })
  }

  render () {
    const {email, password, error, errorEmail} = this.state
    return (
    <form onSubmit={this.onFormSubmit}>
      <p>{error}</p>
      <p>{errorEmail}</p>
      <h3>Login</h3>
      <input
        onChange={this.onInputChange}
        onBlur = {this.onInputBlur}
        value={email}
        type="text"
        placeholder="Email"
        name="email" />

      <input
        onChange={this.onInputChange}
        value={password}
        type="password"
        placeholder="Password"
        name="password" />

      <button type="submit">Submit</button>
    </form>
    )
  }
}