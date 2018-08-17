import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ROOT_URL from '../../helpers/ROOT_URL';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      error: '',
      errorLogin: ''
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
    const {setLoginState} = this.props;
    document.body.removeEventListener('click', this.eventListener);
    document.body.removeEventListener('touchend', this.eventListener);
    setLoginState();
  }
  onInputChange(e) {
    const {name, value} = e.target;
    const obj = {};
    obj[name] = value;
    this.setState(obj);
  }
  onInputBlur(e) {
    const {name, value} = e.target;
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const emailRegex = /\S+@\S+\.\S+/;
    const obj = {};
    obj[`error${capitalize(name)}`] = '';
    if (name === 'login') {
      if (!emailRegex.test(value) && value.includes('@')) obj[`error${capitalize(name)}`] = 'Login must be either valid email or username without an @ symbol';
    }
    this.setState(obj);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;
    let {login} = this.state;
    if (!emailRegex.test(login) && login.includes('@')) {
      this.setState({errorLogin: 'Login must be either valid email or username without an @ symbol'});
      return;
    }
    const {password} = this.state;
    const {setAppState} = this.props;
    login = login.toLowerCase();
    axios.post(`${ROOT_URL}login`, {login, password})
      .then(res => {
        const {loggedIn, times, username} = res.data;
        setAppState({
          loggedIn,
          username,
          times
        });
        this.setState({
          login: '',
          password: '',
          error: '',
          errorLogin: ''
        });
      })
      .catch(err => {
        const {data} = err.response;
        setAppState({loggedIn: data.loggedIn});
        this.setState({
          login: '',
          password: '',
          errorLogin: '',
          error: data.error
        });
      });
  }
  eventListener(e) {
    const {reference, setLoginState} = this.props;
    if (e.target === reference || !this.loginForm.contains(e.target)) setLoginState();
  }
  render() {
    const {
      login,
      password,
      error,
      errorLogin
    } = this.state;
    return (
      <form
        ref={r => {this.loginForm = r;}}
        onSubmit={this.onFormSubmit}
      >
        <p>{error}</p>
        <p>{errorLogin}</p>
        <h3>Login</h3>
        <input
          onChange={this.onInputChange}
          onBlur={this.onInputBlur}
          value={login}
          type="text"
          placeholder="Email or Username"
          name="login"
          minLength="1"
          maxLength="254"
          autoComplete="section-yellow current-email"
        />
        <input
          onChange={this.onInputChange}
          value={password}
          type="password"
          placeholder="Password"
          name="password"
          minLength="8"
          maxLength="40"
          autoComplete="section-yellow current-password"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

Login.propTypes = {
  setLoginState: PropTypes.func.isRequired,
  setAppState: PropTypes.func.isRequired,
  reference: PropTypes.object.isRequired
};
