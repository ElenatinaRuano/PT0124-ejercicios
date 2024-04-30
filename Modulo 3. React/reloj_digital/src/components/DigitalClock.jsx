import React, { useEffect, useState } from "react";

export const DigitalClock = () => {
    const [clockState, setClockState] = useState();

    useEffect(() => {
        setInterval(() => {
        const date = new Date();
        setClockState(date.toLocaleTimeString());
        }, 1000);
    }, []);
    return (
        <div className="digital-clock center border">
            <h1 className="center">RELOJ</h1>
            <h2 className="center">{clockState}</h2>
        </div>
    );
}

