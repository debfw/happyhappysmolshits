"use client";

import { ChangeEvent, useState } from "react";

const TimeZone = () => {
  const [timeZone, setTimeZone] = useState("");
  const [time, setTime] = useState("");
  const [convertTime, setConvertTime] = useState("");
  const converter = () => {
    const inputTime = new Date(time).getTime();

    const selectZone =
      mainTimeZones.find((tz) => tz.name === timeZone)?.offset || 0;
    const convertTime = inputTime + selectZone * 60 * 60 * 1000;

    let newTime = new Date(convertTime).toISOString();

    let year = newTime.split("-")[0];
    let month = newTime.split("-")[1];
    let date = newTime.split("-")[2].split("T")[0];
    let transTime =
      newTime.split("-")[2].split("T")[1].split(".")[0].split(":")[0] +
      ":" +
      newTime.split("-")[2].split("T")[1].split(".")[0].split(":")[1];
    let Abb =
      Number(newTime.split("-")[2].split("T")[1].split(".")[0].split(":")[0]) >
      12
        ? "PM"
        : "AM";

    setConvertTime(`${year}/${month}/${date}, ${transTime} ${Abb}`);
  };
  // Handle timezone selection
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimeZone(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        background: "blue",
        marginTop: 300,
        flexDirection: "column"
      }}
    >
      <div style={{ background: "pink", width: 400, padding: 10 }}>
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ color: "black", marginBottom: 10, width: "100%" }}
        />
        <select
          value={timeZone}
          onChange={handleSelect}
          name="timeZones"
          id="timeZones"
          style={{
            background: "black",
            color: "white",
            width: "100%",
            marginBottom: 10
          }}
        >
          <option value="" disabled>
            Select a timezone
          </option>
          {mainTimeZones.map((tz, index) => (
            <option value={tz.name} key={index}>
              {tz.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          onClick={converter}
          style={{ background: "red", color: "blue", width: "100%" }}
        >
          Convert Time
        </button>
      </div>

      <div
        style={{
          background: "yellow",
          width: 400,
          color: "black",
          padding: 10
        }}
      >
        <div>{convertTime || "No time converted yet."}</div>
      </div>
    </div>
  );
};

export default TimeZone;

// Timezone definitions
const mainTimeZones = [
  { name: "UTC", offset: 0, description: "Coordinated Universal Time" },
  {
    name: "EST",
    offset: -5,
    description: "Eastern Standard Time (e.g., New York, Toronto)"
  },
  {
    name: "PST",
    offset: -8,
    description: "Pacific Standard Time (e.g., Los Angeles, Vancouver)"
  },
  {
    name: "GMT",
    offset: 0,
    description: "Greenwich Mean Time (e.g., UK in winter)"
  },
  {
    name: "JST",
    offset: 9,
    description: "Japan Standard Time (e.g., Tokyo, Osaka)"
  }
];
