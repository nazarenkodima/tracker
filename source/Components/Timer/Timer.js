import React, { Component } from 'react';
import moment from 'moment';
import cx from 'classnames';

import SvgRemoveCircle from '../Icons/RemoveCircle';
import SvgPauseCircle from '../Icons/PauseCircle';
import SvgPlayCircle from '../Icons/PlayCircle';

import Styles from './styles.m.css';

export default class Timer extends Component {
  state = {
    time: moment()
      .utc()
      .hours(0)
      .minutes(0)
      .seconds(0),
    tracker: {
      isRunning: JSON.parse(localStorage.getItem(`Run${this.props.id}`)),
    },
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { time } = this.state;
    const { id } = this.props;

    if (prevState.tracker.isRunning !== this.state.tracker.isRunning) {
      localStorage.setItem(`tracker${id}`, JSON.stringify(time));
      this.handleTrackerTime();
    }
  }

  componentDidMount() {
    const { id } = this.props;
    const {
      tracker: { isRunning },
    } = this.state;
    const timeLapse = this.getTime();

    if (isRunning) {
      localStorage.setItem(`tracker${id}`, JSON.stringify(timeLapse));
    }

    this.handleTrackerTime();
    this.saveTrackerToStorage();
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getTime = () => {
    const { timeStamp } = this.props;
    const now = moment.now();

    return now - timeStamp;
  };

  handleTrackerTime = () => {
    let updatedTrackerTime;
    const {
      time,
      tracker: { isRunning },
    } = this.state;
    const { id } = this.props;
    const trackerTime = JSON.parse(localStorage.getItem(`tracker${id}`));

    if (trackerTime == null) {
      updatedTrackerTime = time;
    } else {
      updatedTrackerTime = moment(trackerTime);
    }

    if (isRunning) {
      this.interval = setInterval(() => {
        updatedTrackerTime.add(1, 'second');

        this.setState({
          time: updatedTrackerTime,
        });
      }, 1000);
    } else {
      updatedTrackerTime = trackerTime;

      this.setState({
        time: updatedTrackerTime,
      });
    }
  };

  saveTrackerToStorage = () => {
    const { id, name, timeStamp } = this.props;
    let trackers = JSON.parse(localStorage.getItem('trackers'));
    const isRunning = JSON.parse(localStorage.getItem(`Run${id}`));

    const tracker = {
      id,
      name,
      isRunning,
      timeStamp,
    };

    this.setState({
      tracker: {
        ...this.state.tracker,
        tracker,
      },
    });

    if (trackers == null) trackers = [];

    if (trackers.some((obj) => obj.id === tracker.id)) {
    } else {
      trackers.push(tracker);
    }

    localStorage.setItem('trackers', JSON.stringify(trackers));
  };

  setIsRunningStatus = (status) => {
    const {
      tracker: { isRunning },
    } = this.state;

    this.setState({ tracker: { ...this.state.tracker, isRunning: !isRunning } });

    localStorage.setItem(`Run${this.props.id}`, JSON.stringify(status));
  };

  pauseTimer = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.setIsRunningStatus(false);
  };

  startTimer = () => {
    this.setIsRunningStatus(true);
  };

  deleteTimer = () => {
    const { id, deleteTracker } = this.props;
    deleteTracker(id);
  };

  render() {
    const { name } = this.props;
    const {
      time,
      tracker: { isRunning },
    } = this.state;

    return (
      <li className={cx(Styles.timer, { [Styles.isRunning]: isRunning })}>
        <div className={Styles.name}>{name}</div>
        <div className={Styles.time}>
          {moment(time)
            .utc()
            .format(moment.HTML5_FMT.TIME_SECONDS)}
        </div>
        <div className={Styles.actions}>
          {isRunning ? (
            <SvgPauseCircle onClick={this.pauseTimer} />
          ) : (
            <SvgPlayCircle onClick={this.startTimer} />
          )}
          <SvgRemoveCircle onClick={this.deleteTimer} />
        </div>
      </li>
    );
  }
}
