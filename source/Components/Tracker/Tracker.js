import React, { Component } from 'react';
import moment from 'moment';

import uuid from 'uuid';

import Timer from '../Timer/Timer';
import SvgPlayArrow from '../Icons/PlayArrow';

import Styles from './styles.m.css';

export default class Tracker extends Component {
  state = {
    newTimerName: '',
    trackers: [],
  };

  componentDidMount() {
    const tracker = JSON.parse(localStorage.getItem('trackers'));

    if (tracker !== null) {
      this.setState(({ trackers }) => ({
        trackers: [...tracker, ...trackers],
      }));
    }

    this.trackerInput.focus();
  }

  updateNewTrackerName = (event) => {
    this.setState({
      newTimerName: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.createTracker();

    this.setState({
      newTimerName: '',
    });
  };

  createTracker = (name = moment().format(moment.HTML5_FMT.TIME_SECONDS)) => {
    const { newTimerName } = this.state;

    if (newTimerName) {
      name = newTimerName;
    }
    const tracker = {
      name,
      id: uuid(),
      timeStamp: moment.now(),
    };

    this.setState(({ trackers }) => ({
      trackers: [tracker, ...trackers],
      newTimerName: '',
    }));

    localStorage.setItem(`Run${tracker.id}`, JSON.stringify(true));
  };

  deleteTracker = (id) => {
    const { trackers } = this.state;

    const newTrackers = trackers.filter((tracker) => tracker.id !== id);

    this.setState({
      trackers: newTrackers,
    });

    localStorage.removeItem('trackers');
    localStorage.setItem('trackers', JSON.stringify(newTrackers));
  };

  render() {
    const { newTimerName, trackers } = this.state;
    const trackersJSX = trackers.sort((firstTracker,lastTracker) => lastTracker.timeStamp - firstTracker.timeStamp).map((tracker) => (
      <Timer
        key={tracker.id}
        name={tracker.name}
        timeStamp={tracker.timeStamp}
        id={tracker.id}
        isRunning={tracker.isRunning}
        deleteTracker={this.deleteTracker}
      />
    ));

    return (
      <main className={Styles.tracker}>
        <section>
          <form onSubmit={this.handleFormSubmit}>
            <input
              maxLength={30}
              placeholder="Enter tracker name"
              type="text"
              value={newTimerName}
              onChange={this.updateNewTrackerName}
              ref={(input) => { this.trackerInput = input; }}
            />
            <button className={Styles.submitButton} type="submit">
              <SvgPlayArrow />
            </button>
          </form>
        </section>
        <section>
          <ul>{trackersJSX}</ul>
        </section>
      </main>
    );
  }
}
