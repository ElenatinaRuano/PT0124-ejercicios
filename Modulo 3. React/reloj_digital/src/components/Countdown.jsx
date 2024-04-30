import React, { useState, useEffect } from "react";

export const Countdown = () => {
    const [time, setTime] = useState("");
    useEffect(() => {
        let countDownDate = new Date("August 13, 2024 13:21:00").getTime();
        let x = setInterval(() => {
        let now = new Date().getTime();

        let distance = countDownDate - now;

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTime(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

        if (distance < 0) {
            clearInterval(x);
            setTime("COUNTDOWN FINISHED");
        }
        }, 1000);
    }, []);
    return (
        <div className="countdown center border">
            <h1 className="center">CUENTA ATRÁS</h1>
            <p className="center">Fecha límite: August 13, 2024 13:21:00</p>
            <h2 className="center">{time}</h2>
        </div>
    );
};

