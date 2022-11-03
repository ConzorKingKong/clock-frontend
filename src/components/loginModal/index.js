import React, {Component} from 'react';
import Login from '../login';
import Register from '../register';
import PropTypes from 'prop-types';
import './index.styl';

export default class loginModal extends Component {
  constructor(props) {
    super(props);

    this.eventListener = this.eventListener.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  componentWillMount() {
    document.body.addEventListener('click', this.eventListener);
    document.body.addEventListener('touchend', this.eventListener);
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.eventListener);
    document.body.removeEventListener('touchend', this.eventListener);
  }
  eventListener(e) {
    if (!this.clickWrapper.contains(e.target)) {
      this.props.setAppState({showLoginModal: false});
    }
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
    const {loggedIn, setAppState, username, loginActive, registerActive} = this.props;
    return (
      <div 
      ref={r => {this.clickWrapper= r;}}
      className="login-modal-wrapper"
      >
        <div className="login-modal">
          <div className="login-new-wrapper">
            <button
              name="login"
              onClick={this.onButtonClick}
              >Log in</button>
            <button
              name="register"
              onClick={this.onButtonClick}
              >Register</button>
          </div>
          { loginActive && 
          <Login 
            setAppState={setAppState}
          />}
          { registerActive && 
          <Register
            setAppState={setAppState}
           /> }
        </div>
      </div>
    );
  }
}

