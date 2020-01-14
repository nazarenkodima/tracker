import React, {Component} from 'react';

import Styles from './styles.m.css';
import SvgPlayArrow from "../Icons/PlayArrow";

export default class Tracker extends Component {

    state = {
        newTrackerName: '',
    };

    updateNewTrackerName = () => {

    };

    render() {
        const {newTrackerName} = this.state;

        return (
            <section className={Styles.tracker}>
                <form>
                    <input
                        placeholder = { `Enter tracker name` }
                        type = 'text'
                        value = { newTrackerName }
                        onChange = { this.updateNewTrackerName}
                    />
                    <button className={Styles.submitButton} type = 'submit'>
                        <SvgPlayArrow/>
                    </button>
                </form>
            </section>
        )
    }
}
