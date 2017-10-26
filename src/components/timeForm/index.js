import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './index.styl';

const ROOT_URL = API_URL || 'http://localhost:3000/api/'; // eslint-disable-line no-undef

export default class TimeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const {_id, ampm, days} = this.props;
    let {hours, minutes, seconds} = this.props;
    if (days.length === 0) {
      this.setState({error: 'You must select at least one day'});
      return;
    }
    hours = parseInt(hours, 10).toString();
    minutes = parseInt(minutes, 10).toString();
    seconds = parseInt(seconds, 10).toString();
    if (hours.match(/[a-z]/i) || minutes.match(/[a-z]/i) || seconds.match(/[a-z]/i)) {
      this.setState({error: "Your times cannot contain characters that aren't numbers"});
      return;
    }
    if (hours.length === 1) hours = `0${hours}`;
    if (minutes.length === 1) minutes = `0${minutes}`;
    if (seconds.length === 1) seconds = `0${seconds}`;
    if (hours.length > 2 || minutes.length > 2 || seconds.length > 2) {
      this.setState({error: 'You cannot have a time longer than 2 digits'});
      return;
    }
    if (parseInt(hours, 10) > 12 || parseInt(minutes, 10) > 59 || parseInt(seconds, 10) > 59) {
      this.setState({error: 'Cannot have impossible times'});
      return;
    }
    axios.post(`${ROOT_URL}addtime`, {
      _id,
      hours,
      minutes,
      seconds,
      ampm,
      days
    })
      .then(res => {
        const {data} = res;
        this.props.setAppState({
          times: data
        });
        this.props.setClockState({
          _id: '',
          hours: '01',
          minutes: '00',
          seconds: '00',
          ampm: 'AM',
          days: []
        });
        this.setState({error: ''});
      })
      .catch(err => {
        const {error, loggedIn} = err.response.data;
        this.setState({error});
        this.props.setAppState({loggedIn});
      });
  }
  onButtonPress() {
    const {formClear} = this.props;
    formClear();
    this.setState({error: ''});
  }
  render() {
    const {
      ampm,
      days,
      _id,
      onNumberChange,
      onSelectChange,
      onCheckChange
    } = this.props;
    let {hours, minutes, seconds} = this.props;
    const {error} = this.state;
    hours = JSON.stringify(parseInt(hours, 10)) !== 'null' ? parseInt(hours, 10) : '';
    minutes = JSON.stringify(parseInt(minutes, 10)) !== 'null' ? parseInt(minutes, 10) : '';
    seconds = JSON.stringify(parseInt(seconds, 10)) !== 'null' ? parseInt(seconds, 10) : '';
    return (
      <form className="time-form" onSubmit={this.onFormSubmit}>
        <p>{error}</p>
        { _id !== '' &&
        <button onClick={this.onButtonPress}>Cancel</button> }
        <div className="time-form-inputs">
          <div>
            <h5>Hours</h5>
            <input
              type="number"
              name="hours"
              min="1"
              max="12"
              onChange={onNumberChange}
              value={hours}
            />
          </div>
          <div>
            <h5>Minutes</h5>
            <input
              type="number"
              name="minutes"
              min="0"
              max="59"
              onChange={onNumberChange}
              value={minutes}
            />
          </div>
          <div>
            <h5>Seconds</h5>
            <input
              type="number"
              name="seconds"
              min="0"
              max="59"
              onChange={onNumberChange}
              value={seconds}
            />
          </div>
          <select name="ampm" value={ampm} onChange={onSelectChange} >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <fieldset className="form-fieldset">
          <label htmlFor="sunday">
            <input
              onChange={onCheckChange}
              type="checkbox"
              name="sunday"
              value="0"
              checked={days.includes(0) && true}
            />
          Sunday
          </label>
          <label htmlFor="monday">
            <input
              onChange={onCheckChange}
              type="checkbox"
              name="monday"
              value="1"
              checked={days.includes(1) && true}
            />
            Monday
          </label>
          <label htmlFor="tuesday">
            <input
              onChange={onCheckChange}
              type="checkbox"
              name="tuesday"
              value="2"
              checked={days.includes(2) && true}
            />
            Tuesday
          </label>
          <label htmlFor="wednesday">
            <input
              onChange={onCheckChange}
              type="checkbox"
              name="wednesday"
              value="3"
              checked={days.includes(3) && true}
            />
            Wednesday
          </label>
          <label htmlFor="thursday">
            <input
              onChange={onCheckChange}
              type="checkbox"
              name="thursday"
              value="4"
              checked={days.includes(4) && true}
            />
            Thursday
          </label>
          <label htmlFor="friday">
            <input
              onChange={onCheckChange}
              type="checkbox"
              name="friday"
              value="5"
              checked={days.includes(5) && true}
            />
            Friday
          </label>
          <label htmlFor="saturday">
            <input
              onChange={onCheckChange}
              type="checkbox"
              name="saturday"
              value="6"
              checked={days.includes(6) && true}
            />
            Saturday
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

TimeForm.propTypes = {
  _id: PropTypes.string.isRequired,
  hours: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  ampm: PropTypes.string.isRequired,
  days: PropTypes.arrayOf(PropTypes.number).isRequired,
  setAppState: PropTypes.func.isRequired,
  setClockState: PropTypes.func.isRequired,
  onNumberChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  onCheckChange: PropTypes.func.isRequired,
  formClear: PropTypes.func.isRequired
};
