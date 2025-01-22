"use client";

import { useEffect, useState } from "react";

const Timer = () => {
  const [hour, setHour] = useState<string>("00");
  const [min, setMin] = useState<string>("00");
  const [sec, setSec] = useState<string>("00");
  const [minError, setMinError] = useState("");
  const [secError, setSecError] = useState("");
  const [hourError, setHourError] = useState("");
  const [numericError, setNumericError] = useState("");
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    if (!counting) return;

    let second = Number(sec);
    let minute = Number(min);
    setTimeout(() => {
      if (second === 0 && minute === 0) return;
      if (second === 0 && minute !== 0) {
        second = 60;
        minute -= 1;
      }

      second -= 1;
      setSec(addZero(second.toString()));
      setMin(addZero(minute.toString()));
    }, 1000);
  }, [counting, sec, min]);

  useEffect(() => {
    if (
      !/^[0-9]*$/.test(sec) ||
      !/^[0-9]*$/.test(min) ||
      !/^[0-9]*$/.test(hour)
    ) {
      setNumericError("Please only type numbers");
    }
    if (sec === "") {
      setSec("00");
    }
    if (min === "") {
      setMin("00");
    }
    if (hour === "") {
      setHour("00");
    }
    if (Number(sec) > 59) {
      setSecError("Lower than 60");
    } else {
      setSecError;
    }

    if (Number(min) > 59) {
      setMinError("Lower than 60");
    } else {
      setMinError;
    }

    if (Number(hour) > 3) {
      setHourError("Lower than 3");
    } else {
      setHourError;
    }
  }, [hour, min, sec]);

  const addZero = (time: string) => {
    if (time.length === 1) {
      return `0${time}`;
    }
    return time;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 100,
        flexDirection: "column"
      }}
    >
      <form style={{ margin: 40 }}>
        <label htmlFor="textInput">Enter the time </label>
        <span style={{ color: "yellow", backgroundColor: "red" }}>
          {numericError}
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            marginTop: 10
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: 10
            }}
          >
            <label>Hour</label>
            <input
              type="text"
              name="textInput"
              style={{
                width: 80,
                height: 40,
                color: "black",
                marginLeft: 5
              }}
              onChange={(e) => setHour(addZero(e.target.value))}
            />
            <div style={{ color: "red", background: "yellow" }}>
              {hourError}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: 10
            }}
          >
            <label>Minute</label>
            <input
              type="text"
              name="textInput"
              style={{
                width: 80,
                height: 40,
                color: "black",
                marginLeft: 5
              }}
              onChange={(e) => setMin(addZero(e.target.value))}
            />
            <div>{minError}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: 10
            }}
          >
            <label>Second</label>
            <input
              type="text"
              name="textInput"
              style={{
                width: 80,
                height: 40,
                color: "black",
                marginLeft: 5
              }}
              onChange={(e) => setSec(addZero(e.target.value))}
            />
            <div>{secError}</div>
          </div>
        </div>
      </form>

      <div
        style={{
          marginLeft: 50,
          color: "lightblue",
          display: "flex",
          flexDirection: "row"
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: 20
          }}
        >
          <p style={{ color: "black", fontSize: 50 }}>
            {hour}:{min}:{sec}
          </p>
        </div>
        <button
          type="submit"
          value="Submit"
          style={{
            margin: 20,
            backgroundColor: "grey",
            color: "white",
            borderRadius: 15,
            padding: 10
          }}
          onClick={() => {
            setCounting(true);
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Timer;
