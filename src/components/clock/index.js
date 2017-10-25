import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TimeTable from '../timeTable';
import TimeForm from '../timeForm';

import './clock.styl';

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      hours: '01',
      minutes: '00',
      seconds: '00',
      ampm: 'AM',
      days: []
    };
    this.onNumberChange = this.onNumberChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.editTime = this.editTime.bind(this);
    this.setClockState = this.setClockState.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.cleanNums = this.cleanNums.bind(this);
    this.formClear = this.formClear.bind(this);
  }
  setClockState(e) {
    this.setState(e);
  }
  formClear() {
    this.setState({
      _id: '',
      hours: '01',
      minutes: '00',
      seconds: '00',
      ampm: 'AM',
      days: []
    });
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
    obj[e.target.name] = e.target.value;
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
  editTime(e) {
    const {
      _id,
      hours,
      minutes,
      seconds,
      ampm,
      days
    } = e.target.dataset;
    const newDays = days.split(',').map(day => (parseInt(day, 10)));
    this.setState({
      _id,
      hours,
      minutes,
      seconds,
      ampm,
      days: newDays
    });
  }
  cleanNums(num) {
    if (num.toString().length === 1) {
      num = `0${num}`;
    }
    return num;
  }
  render() {
    const {
      _id,
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
    const day = date.getDay();
    const month = this.cleanNums(date.getMonth() + 1);
    const dateOfMonth = this.cleanNums(date.getDate());
    const year = date.getFullYear();
    const clockMinutes = this.cleanNums(date.getMinutes());
    const clockSeconds = this.cleanNums(date.getSeconds());
    let clockHours = date.getHours();
    let clockAmpm = 'AM';
    if (clockHours === 12) {
      clockAmpm = 'PM';
    } else if (clockHours >= 13 && clockHours !== 24) {
      clockHours -= 12;
      clockAmpm = 'PM';
    } else if (clockHours === 24) {
      clockHours -= 12;
    }
    clockHours = this.cleanNums(clockHours);
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
          <p>{clockHours}:{clockMinutes}:{clockSeconds} {clockAmpm}</p>
        </div>
        { loggedIn &&
        <TimeForm
          setAppState={setAppState}
          setClockState={this.setClockState}
          onCheckChange={this.onCheckChange}
          onSelectChange={this.onSelectChange}
          onNumberChange={this.onNumberChange}
          formClear={this.formClear}
          _id={_id}
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
