import React, { useEffect, useState } from 'react';
export var CountdownTimer = function (_a) {
    var targetDate = _a.targetDate;
    var calculateTimeLeft = React.useCallback(function () {
        var difference = +new Date(targetDate) - +new Date();
        var timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }, [targetDate]);
    var _b = useState(calculateTimeLeft()), timeLeft = _b[0], setTimeLeft = _b[1];
    useEffect(function () {
        var timer = setInterval(function () {
            var time = calculateTimeLeft();
            setTimeLeft(time);
        }, 1000);
        return function () { return clearInterval(timer); };
    }, [calculateTimeLeft]);
    var timerComponents = [];
    Object.keys(timeLeft).forEach(function (interval) {
        if (timeLeft[interval]) {
            timerComponents.push(<span key={interval}>
          {timeLeft[interval]} {interval}{" "}
        </span>);
        }
    });
    return (<span style={{ fontWeight: "bold" }}>
      {timerComponents.length ? timerComponents : <span>Countdown finished!</span>}
    </span>);
};
