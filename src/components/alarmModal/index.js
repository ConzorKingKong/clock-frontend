import React, {Component} from 'react';
import gong from '../../assets/gong.mp3';
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
    if (e.target === this.stopButton || !this.modal.contains(e.target)) setAppState({alarm: false, alarmTime: {}});
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
    const {
      hours,
      minutes,
      seconds,
      ampm,
      day
    } = this.props.alarmTime;
    return (
      <div ref={r => {this.modal = r;}} className="alarm-modal">
        <audio src={gong} autoPlay loop />
        <h4>Your alarm for {hours}:{minutes}:{seconds} {ampm} on {dayKey[day]} went off</h4>
        <button ref={r => {this.stopButton = r;}} onClick={this.onButtonClick}>■</button>
      </div>
    );
  }
}
