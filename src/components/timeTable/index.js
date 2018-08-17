import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import cleanNums from '../../helpers/cleanNums';
import ROOT_URL from '../../helpers/ROOT_URL';
import './index.styl';

export default class TimeTable extends Component {
  constructor(props) {
    super(props);

    this.deleteTime = this.deleteTime.bind(this);
    this.renderTables = this.renderTables.bind(this);
  }

  deleteTime(e) {
    const {id} = e.target;
    axios.post(`${ROOT_URL}deletetime`, {id})
      .then(res => {
        const times = res.data;
        this.props.setAppState({
          times
        });
      })
      .catch(err => {
        console.log('err ', err);
      });
  }

  renderTables() {
    const dayKey = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };
    const ampmKey = {
      0: 'AM',
      1: 'PM'
    };
    return this.props.times.map(time => {
      const {
        id,
        hours,
        minutes,
        seconds,
        ampm,
        days
      } = time;
      const displayHours = cleanNums(hours);
      const displayMinutes = cleanNums(minutes);
      const displaySeconds = cleanNums(seconds);
      return (
        <div
          key={id}
          className="time-table"
        >
          <p>{displayHours}:{displayMinutes}:{displaySeconds} {ampmKey[ampm]} {days.map(day => (`${dayKey[day]} `))}</p>
          <button
            id={id}
            data-id={id}
            data-hours={hours}
            data-minutes={minutes}
            data-seconds={seconds}
            data-ampm={ampm}
            data-days={days}
            onClick={this.props.editTime}
          >
            Edit
          </button>
          <button
            id={id}
            onClick={this.deleteTime}
          >
            Delete
          </button>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderTables()}
      </div>
    );
  }
}

TimeTable.propTypes = {
  times: PropTypes.arrayOf(PropTypes.object).isRequired,
  editTime: PropTypes.func.isRequired,
  setAppState: PropTypes.func.isRequired
};
