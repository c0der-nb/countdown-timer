import React, { useState, useEffect } from 'react';
import styles from "./Homepage.module.css";
import TimerCard from '../components/TimerCard/TimerCard';

export default function Homepage () {
    const [ dateTime, setDateTime ] = useState(null)
    const [ isRunning, setIsRunning ] = useState(false);
    const [ timer, setTimer ] = useState(0);
    const [ isCountdownFinished, setCountdownFinished ] = useState(false);
    const [ isValid, setIsValid ]  = useState(true);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!isRunning && validate()) {
            const currentDateTime = new Date();
            const selectedDateTime = new Date(dateTime);
            setTimer(selectedDateTime - currentDateTime);
            setIsRunning(true);
            setIsValid(true);
            setCountdownFinished(false)
        }
        else {
            setTimer(0)
            setIsRunning(false);
        }
    }

    const validate = () => {
        const diff = new Date(dateTime) - new Date();
        if (Math.floor((diff/(24*60*60*1000))) > 99 || diff < 0) {
            if (diff < 0)
                setIsValid(true)
            else
                setIsValid(false);
            return false;
        }
        else {
            return true;
        }
    }

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prevVal) => prevVal - 1000);
            }, 1000)
        }
        return () => clearInterval(interval);
    }, [isRunning])

    useEffect(() => {
        if (timer <= 0 && isRunning) {
            setCountdownFinished(true);
            setIsRunning(false)
        }
    }, [timer, isRunning])

    return (
        <div className={styles.container}>
            <h2>Countdown Timer</h2>
            <form onSubmit={submitHandler}>
                <input type="datetime-local" onChange={(e) => setDateTime(e.target.value)} />
                <button type='Submit' onClick={submitHandler}>{isRunning ? "Cancel Timer" : "Star Timer"}</button>
            </form>
            {isValid ? !isCountdownFinished ?
            <div className={styles.cardContainer}>
                <TimerCard value={Math.floor(timer/(24*60*60*1000))} type='Days' />
                <TimerCard value={Math.floor((timer%(24*60*60*1000))/(60*60*1000))} type="Hours" />
                <TimerCard value={Math.floor((timer%(60*60*1000))/(60*1000))} type="Minutes" />
                <TimerCard value={Math.floor((timer%(60*1000))/1000)} type="Seconds" />
            </div> : <p>The Countdown is over. What's next on your adventure?</p> : <p>Selected time is more than 99 days.</p>}
        </div>
    )
}