import React, { useState } from 'react';
import styles from "./Homepage.module.css";
import TimerCard from '../components/TimerCard/TimerCard';

export default function Homepage () {
    const [ dateTime, setDateTime ] = useState(null)
    const [ buttonType, setButtonType ] = useState("Start Timer")
    const [ isCountdownRunning, setCountdownRunning ] = useState(false);

    const submitHandler = () => {

    }

    const buttonHandler = () => {

    }

    const validate = () => {
        
    }

    return (
        <div className={styles.container}>
            <h2>Countdown Timer</h2>
            <form onSubmit={submitHandler}>
                <input type="datetime-local" />
                <button type='Submit' onClick={buttonHandler}>{buttonType}</button>
            </form>
            <div className={styles.cardContainer}>
                <TimerCard value={'12'} type='Days' />
                <TimerCard value={'10'} type="Hours" />
                <TimerCard value={'22'} type="Minutes" />
                <TimerCard value={'45'} type="Seconds" />
            </div>
        </div>
    )
}