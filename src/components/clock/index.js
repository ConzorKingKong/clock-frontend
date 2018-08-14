import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TimeTable from '../timeTable';
import TimeForm from '../timeForm';
import cleanNums from '../../helpers/cleanNums';

import './clock.styl';

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      hours: 1,
      minutes: 0,
      seconds: 0,
      ampm: 0,
      days: []
    };
    this.onNumberChange = this.onNumberChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.editTime = this.editTime.bind(this);
    this.setClockState = this.setClockState.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.formClear = this.formClear.bind(this);
  }
  onNumberChange(e) {
    const obj = {};
    const {name, value} = e.target;
    let newValue = value;
    if (newValue.length === 1) newValue = `0${newValue}`;
    obj[name] = newValue;
    this.setState(obj);
  }
  onSelectChange(e) {
    const obj = {};
    if (e.target.name === 'ampm') {
      obj[e.target.name] = parseInt(e.target.value, 10);
    } else {
      obj[e.target.name] = e.target.value;
    }
    this.setState(obj);
  }
  onCheckChange(e) {
    const {days} = this.state;
    const {checked, value} = e.target;
    const parsedValue = parseInt(value, 10);
    if (checked) {
      this.setState({days: [...days, parsedValue]});
    } else {
      const newDays = days.filter(i => (i !== parsedValue));
      this.setState({
        days: newDays
      });
    }
  }
  setClockState(e) {
    this.setState(e);
  }
  formClear() {
    this.setState({
      id: '',
      hours: 1,
      minutes: 0,
      seconds: 0,
      ampm: 0,
      days: []
    });
  }
  editTime(e) {
    const {
      id
    } = e.target.dataset;
    let {
      hours,
      minutes,
      seconds,
      ampm,
      days
    } = e.target.dataset;
    // Convert to numbers to match prop type
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    seconds = parseInt(seconds, 10);
    ampm = parseInt(ampm, 10);
    days = days.split(',').map(day => (parseInt(day, 10)));
    this.setState({
      id,
      hours,
      minutes,
      seconds,
      ampm,
      days
    });
  }
  render() {
    const {
      id,
      hours,
      minutes,
      seconds,
      ampm,
      days
    } = this.state;
    const {
      loggedIn,
      date,
      setAppState,
      times
    } = this.props;
    const daysKey = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    const ampmKey = {
      0: 'AM',
      1: 'PM'
    };
    const day = date.getDay();
    const month = cleanNums(date.getMonth() + 1);
    const dateOfMonth = cleanNums(date.getDate());
    const year = date.getFullYear();
    const clockMinutes = cleanNums(date.getMinutes());
    const clockSeconds = cleanNums(date.getSeconds());
    let clockHours = date.getHours();
    let clockAmpm = 0;
    if (clockHours === 12) {
      clockAmpm = 1;
    } else if (clockHours >= 13 && clockHours !== 24) {
      clockHours -= 12;
      clockAmpm = 1;
    } else if (clockHours === 24) {
      clockHours -= 12;
    } else if (clockHours === 0) {
      clockHours += 12;
    }
    clockHours = cleanNums(clockHours);
    return (
      <div>
        { loggedIn &&
        <TimeTable
          setAppState={setAppState}
          times={times}
          editTime={this.editTime}
        /> }
        <div className="clock-display-time">
          <p>{daysKey[day]} {month}-{dateOfMonth}-{year}</p>
          <p>{clockHours}:{clockMinutes}:{clockSeconds} {ampmKey[clockAmpm]}</p>
        </div>
        { loggedIn &&
        <TimeForm
          setAppState={setAppState}
          setClockState={this.setClockState}
          onCheckChange={this.onCheckChange}
          onSelectChange={this.onSelectChange}
          onNumberChange={this.onNumberChange}
          formClear={this.formClear}
          id={id}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          ampm={ampm}
          days={days}
        /> }
      </div>
    );
  }
}

Clock.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  date: PropTypes.object.isRequired,
  setAppState: PropTypes.func.isRequired,
  times: PropTypes.array.isRequired
};
