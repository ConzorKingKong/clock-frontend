import React, {Component} from 'react'
import axios from 'axios'

export default class Register extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      username: '',
      password: '',
      verifyPassword: '',
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
    const {email, username, password, verifyPassword} = this.state
    // handle not matching passwords
    if (password !== verifyPassword) {
      this.setState({error: "Your passwords do not match"})
      return
    }
    axios.post("http://localhost:3000/api/signup", {email: email.toLowerCase(), username: username.toLowerCase(), password: password}, {headers: {"Content-Type": "application/json"}})
      .then(res => {
        const {data} = res
        this.props.setAppState({loggedIn: data.loggedIn, times: data.times})
        this.setState({email: '', username: '', password: '', verifyPassword: '', error: ''})
      })
      .catch(err => {
        const {data} = err.response
        this.setState({email: '', username: '', password: '', verifyPassword: '', error: data.error})  
      })
  }


  render () {
    const {email, username, password, verifyPassword} = this.state
    return (
    <form onSubmit={this.onFormSubmit} >
      <p>{this.state.error}</p>
      <h3>Register</h3>
      <input onChange={this.onInputChange} value={email} type="text" placeholder="Email" name="email" />
      <input onChange={this.onInputChange} value={username} type="text" placeholder="Username" name="username" />
      <input onChange={this.onInputChange} value={password} type="password" placeholder="Password" name="password" />
      <input onChange={this.onInputChange} value={verifyPassword} type="password" placeholder="Verify Password" name="verifyPassword" />
      <button type="submit">Submit</button>
    </form>
    )
  }
}