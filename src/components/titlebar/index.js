import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Login from '../login';
import Register from '../register';
import Logout from '../logout';
import './index.styl';

export default class Titlebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
      register: false
    };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.setLoginState = this.setLoginState.bind(this);
    this.setRegisterState = this.setRegisterState.bind(this);
  }
  onButtonClick(e) {
    const {state} = this;
    const {name} = e.target;
    const obj = {};
    obj[name] = !state[name];
    this.setState(obj);
  }
  setLoginState() {
    this.setState({login: false});
  }
  setRegisterState() {
    this.setState({register: false});
  }
  render() {
    const {login, register} = this.state;
    const {loggedIn} = this.props;
    return (
      <div className="titlebar-wrapper">
        { !loggedIn &&
        <div className="button-wrapper">
          { !loggedIn &&
          <button
            ref={r => {!this.state.loginButton && this.setState({loginButton: r});}}
            className="login-button"
            name="login"
            onClick={this.onButtonClick}
          >
            Log In
          </button>
          }
          { login &&
          <Login
            reference={this.state.loginButton}
            setAppState={this.props.setAppState}
            setLoginState={this.setLoginState}
          />
          }
        </div>
        }
        {!loggedIn &&
        <div className="button-wrapper">
          <button
            ref={r => {!this.state.registerButton && this.setState({registerButton: r});}}
            className="register-button"
            name="register"
            onClick={this.onButtonClick}
          >
            Register
          </button>
          { register &&
          <Register
            reference={this.state.registerButton}
            setAppState={this.props.setAppState}
            setRegisterState={this.setRegisterState}
          />
          }
        </div>
        }
        { loggedIn && <Logout setAppState={this.props.setAppState} /> }
      </div>
    );
  }
}

Titlebar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setAppState: PropTypes.func.isRequired
};
