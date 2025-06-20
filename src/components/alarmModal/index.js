import React, {Component} from 'react';
import PropTypes from 'prop-types';
import gong from '../../assets/gong.mp3';
import cleanNums from '../../helpers/cleanNums';
import './index.styl';

export default class AlarmModal extends Component {
  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
  }
  componentWillMount() {
    document.body.addEventListener('click', this.onButtonClick);
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.onButtonClick);
  }
  onButtonClick(e) {
    const {setAppState} = this.props;
    if (e.target === this.stopButton || !this.modal.contains(e.target)) {
      setAppState({
        alarm: false,
        alarmTime: {}
      });
    }
  }
  render() {
    const dayKey = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday'
    ];
    const ampmKey = {
      0: 'AM',
      1: 'PM'
    };
    const {
      hours,
      minutes,
      seconds,
      ampm,
      day
    } = this.props.alarmTime;
    const displayHours = cleanNums(hours);
    const displayMinutes = cleanNums(minutes);
    const displaySeconds = cleanNums(seconds);
    return (
      <div ref={r => {this.modal = r;}} className="alarm-modal">
        <audio src={gong} autoPlay loop />
        <h4>
          Your alarm for {displayHours}:{displayMinutes}:{displaySeconds} {ampmKey[ampm]}
          on {dayKey[day]} went off
        </h4>
        <button ref={r => {this.stopButton = r;}} onClick={this.onButtonClick}>■</button>
      </div>
    );
  }
}

AlarmModal.propTypes = {
  alarmTime: PropTypes.shape({
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    ampm: PropTypes.number.isRequired,
    day: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired,
  setAppState: PropTypes.func.isRequired
};
