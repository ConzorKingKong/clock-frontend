import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ROOT_URL from '../../helpers/ROOT_URL';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      verifyPassword: '',
      error: '',
      errorEmail: '',
      errorUsername: '',
      errorPassword: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.eventListener = this.eventListener.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  componentWillMount() {
    document.body.addEventListener('click', this.eventListener);
    document.body.addEventListener('touchend', this.eventListener);
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.eventListener);
    document.body.removeEventListener('touchend', this.eventListener);
    this.props.setRegisterState();
  }
  onInputChange(e) {
    const {name, value} = e.target;
    const obj = {};
    obj[name] = value;
    this.setState(obj);
  }
  onInputBlur(e) {
    const {name, value} = e.target;
    const {password, verifyPassword} = this.state;
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const emailRegex = /\S+@\S+\.\S+/;
    const obj = {};
    if (name === 'verifyPassword') {
      obj.errorPassword = '';
    } else {
      obj[`error${capitalize(name)}`] = '';
    }
    if (name === 'email') {
      if (!emailRegex.test(value) && value !== '') obj[`error${capitalize(name)}`] = 'Email is not valid';
    } else if (name === 'username') {
      if (value.match('@') !== null) obj[`error${capitalize(name)}`] = 'Invalid Username. Cannot contain @';
    } else if (name === 'password' || name === 'verifyPassword') {
      if ((value !== verifyPassword && verifyPassword !== '') || (value !== password && password !== '')) obj.errorPassword = 'Passwords do not match';
    }
    this.setState(obj);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const {
      email,
      username,
      password,
      verifyPassword
    } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    if (email === '' || username === '' || password === '' || verifyPassword === '') {
      this.setState({error: 'Cannot have blank fields'});
      return;
    }
    if (!emailRegex.test(email) || username.match('@') !== null) return;
    if (password !== verifyPassword) {
      this.setState({error: '', errorPassword: 'Passwords do not match'});
      return;
    }
    axios.post(`${ROOT_URL}newuser`, {email: email.toLowerCase(), username, password}, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        const {data} = res;
        this.props.setAppState({
          loggedIn: data.loggedIn,
          username: data.username,
          times: data.times
        });
        this.setState({
          email: '',
          username: '',
          password: '',
          verifyPassword: '',
          error: '',
          errorEmail: '',
          errorUsername: '',
          errorPassword: ''
        });
      })
      .catch(err => {
        const {data} = err.response;
        this.setState({
          errorEmail: '',
          errorUsername: '',
          errorPassword: '',
          error: data.error
        });
      });
  }
  eventListener(e) {
    const {reference, setRegisterState} = this.props;
    if (e.target === reference || !this.registerForm.contains(e.target)) setRegisterState();
  }
  render() {
    const {
      email,
      username,
      password,
      verifyPassword,
      error,
      errorEmail,
      errorUsername,
      errorPassword
    } = this.state;
    return (
      <form
        ref={r => {this.registerForm = r;}}
        onSubmit={this.onFormSubmit}
      >
        <p>{error}</p>
        <p>{errorEmail}</p>
        <p>{errorUsername}</p>
        <p>{errorPassword}</p>
        <h3>Register</h3>
        <input
          onBlur={this.onInputBlur}
          onChange={this.onInputChange}
          value={email}
          type="text"
          placeholder="Email"
          name="email"
          minLength="5"
          maxLength="254"
          autoComplete="section-green new-email"
        />
        <input
          onBlur={this.onInputBlur}
          onChange={this.onInputChange}
          value={username}
          type="text"
          placeholder="Username"
          name="username"
          minLength="1"
          maxLength="20"
        />
        <input
          onBlur={this.onInputBlur}
          onChange={this.onInputChange}
          value={password}
          type="password"
          placeholder="Password"
          name="password"
          minLength="8"
          maxLength="40"
          autoComplete="section-green new-password"
        />
        <input
          onBlur={this.onInputBlur}
          onChange={this.onInputChange}
          value={verifyPassword}
          type="password"
          placeholder="Verify Password"
          name="verifyPassword"
          minLength="8"
          maxLength="40"
          autoComplete="section-green new-password"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

Register.propTypes = {
  setAppState: PropTypes.func.isRequired,
  setRegisterState: PropTypes.func.isRequired,
  reference: PropTypes.object.isRequired
};
