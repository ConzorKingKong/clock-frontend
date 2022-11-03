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
  }
  onButtonClick(e) {
    const newState = {showLoginModal: true}
    if (e.target.name === "login") {
      newState.loginActive = true
      newState.registerActive = false
    } else {
      newState.loginActive = false
      newState.registerActive = true
    }
    this.props.setAppState(newState)
  }
  render() {
    const {
      login,
      register,
      loginButton,
      registerButton
    } = this.state;
    const {loggedIn, setAppState, username} = this.props;
    return (
      <div className="titlebar-wrapper">
        { !loggedIn &&
        <div className="button-wrapper">
          { !loggedIn &&
          <button
            className="login-button"
            name="login"
            onClick={this.onButtonClick}
          >
            Log In
          </button>
          }
        </div>
        }
        {!loggedIn &&
        <div className="button-wrapper">
          <button
            className="register-button"
            name="register"
            onClick={this.onButtonClick}
          >
            Register
          </button>
        </div>
        }
        { loggedIn && <Logout username={username} setAppState={setAppState} /> }
      </div>
    );
  }
}

Titlebar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setAppState: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};
