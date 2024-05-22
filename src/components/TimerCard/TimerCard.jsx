import React, { useState } from "react";
import styles from "./TimerCard.module.css";

export default function TimerCard ({ value, type }) {
    return (
        <div className={styles.container}>
            <h3>{value}</h3>
            <p>{type}</p>
        </div>
    )
}