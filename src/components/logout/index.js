import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './index.styl';

const ROOT_URL = API_URL || 'http://localhost:3000/api/'; // eslint-disable-line no-undef

export default class Logout extends Component {
  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
  }
  onButtonClick() {
    axios.post(`${ROOT_URL}logout`)
      .then(() => {
        this.props.setAppState({loggedIn: false, username: '', times: []});
      })
      .catch(err => {
        this.props.setAppState({loggedIn: false, username: '', times: []});
        console.log(err);
      });
  }
  render() {
    const {username} = this.props;
    return (
      <div>
        <div>Welcome {username} </div>
        <button
          className="logout-button"
          onClick={this.onButtonClick}
        >
          Logout
        </button>
      </div>
    );
  }
}

Logout.propTypes = {
  setAppState: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};
