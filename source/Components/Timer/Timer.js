import React, {Component} from 'react';

import SvgRemoveCircle from "../Icons/RemoveCircle";
import SvgPauseCircle from "../Icons/PauseCircle";
import SvgPlayCircle from "../Icons/PlayCircle";

import Styles from './styles.m.css';

export default class Timer extends Component {
    render() {
        const {name, time, } = this.props;

        return (
          <li className={Styles.timer}>
              <div className={Styles.name}>
                  {name}
              </div>
              <div className={Styles.time}>
                  {time}
              </div>
              <div className={Styles.actions}>
                  <SvgPauseCircle/>
                  <SvgRemoveCircle/>
              </div>

          </li>
        );
    }
}
