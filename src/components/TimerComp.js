import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function TimerComp({ endTime }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(endTime) - +new Date();

    let timeLeft = {
      HOURS: 0,
      MINS: 0,
      SECONDS: 0,
    };
    let timeString = "";
    let hrs = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let mins = Math.floor((difference / 1000 / 60) % 60);
    let secs = Math.floor((difference / 1000) % 60);
    if (difference > 0) {
      timeLeft = {
        HOURS: hrs < 10 ? `0${hrs}` : hrs,
        MINS: mins < 10 ? `0${mins}` : mins,
        SECONDS: secs < 10 ? `0${secs}` : secs,
      };
      timeString = `${timeLeft.HOURS}:${timeLeft.MINS}:${timeLeft.SECONDS}`;
    }
    setTimeLeft(timeString);
    return timeString;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    if (timeLeft !== null && timeLeft === "") {
    }
    return () => {
      clearInterval(timer);
    };
  }, [endTime, timeLeft]);

  return (
    <div>
      {timeLeft != "" && (
        <Typography
          style={{
            width: "100%",
            fontFamily: "Rubik",
            fontWeight: 700,
            fontSize: 21,
            lineHeight: "110%",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          {timeLeft === null ? "..." : timeLeft}
        </Typography>
      )}
      {timeLeft === "" && (
        <Typography
          style={{
            width: "100%",
            fontFamily: "Rubik",
            fontWeight: 700,
            fontSize: 21,
            lineHeight: "110%",
            textAlign: "center",
            color: "#ffffff",
          }}
        ></Typography>
      )}
    </div>
  );
}

export default TimerComp;
