import React, {Component} from 'react';
import moment from 'moment';
import uuid from 'uuid'

import Timer from "../Timer/Timer";
import SvgPlayArrow from "../Icons/PlayArrow";

import Styles from './styles.m.css';

export default class Tracker extends Component {

    state = {
        newTimerName: '',
        trackers: []
    };

    updateNewTrackerName = (event) => {
        console.log(event.target.value);
        this.setState({
            newTimerName: event.target.value
        })
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        const {newTimerName} = this.state;
        const noName = moment().format(moment.HTML5_FMT.TIME_SECONDS);


        this.createTracker();

        this.setState({
            newTimerName: ''
        })
    };

    createTracker = (name = moment().format(moment.HTML5_FMT.TIME_SECONDS)) => {
        const {newTimerName} = this.state;

        if(newTimerName) {
            name = newTimerName;
        }
        const tracker = {
            name,
            id: uuid(),
            time: moment.now()
        };

        this.setState(({ trackers }) => ({
            trackers:          [tracker, ...trackers],
            newTaskMessage: '',
        }));
    };

    render() {
        const {newTimerName, trackers} = this.state;

        const trackersJSX = trackers.map((tracker) => (
            <Timer
                key={tracker.id}
                name={tracker.name}
                time={tracker.time}
            />
        ));

        return (
            <main className={Styles.tracker}>
                <section>
                    <form onSubmit={this.handleFormSubmit}>
                        <input
                            maxLength={30}
                            placeholder = { `Enter tracker name` }
                            type = 'text'
                            value = { newTimerName }
                            onChange = { this.updateNewTrackerName}
                        />
                        <button className={Styles.submitButton} type = 'submit'>
                            <SvgPlayArrow/>
                        </button>
                    </form>
                </section>
                <section>
                    <ul>
                        {trackersJSX}
                    </ul>
                </section>
            </main>
        )
    }
}
