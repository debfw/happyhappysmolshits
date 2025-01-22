"use client";

import { useState } from "react";

const Calculator = () => {
  const [symbol, setSymbol] = useState("");
  const [prev, setPrev] = useState("");
  const [current, setCurrent] = useState<string>("");
  const numberRows = [
    [1, 2, 3, "+"],
    [4, 5, 6, "-"],
    [7, 8, 9, "x"],
    [0, "C", "=", "/"]
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    let clickValue = (event.target as HTMLButtonElement).textContent;
    if (!isNaN(Number(clickValue))) {
      setCurrent((prev) => prev + clickValue);
    } else if (clickValue === "C") {
      setCurrent("");
      setPrev("");
      setSymbol("");
    } else if (clickValue === "=") {
      if (prev !== "" && symbol && current !== "") {
        const result = calculate(Number(prev), Number(current), symbol);
        setCurrent(result.toString());
        setPrev("");
        setSymbol("");
      }
    } else {
      if (clickValue) {
        setPrev(current);
        setSymbol(clickValue?.toString());
        setCurrent("");
      }
    }
  };

  const calculate = (a: number, b: number, operator: string) => {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "x":
        return a * b;
      case "/":
        return a / b;
      default:
        return 0;
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "blue",
          color: "white",
          display: "flex",
          flexDirection: "column",
          width: 300,
          padding: 10,
          marginTop: 300
        }}
      >
        <input
          style={{ color: "black", textAlign: "end", paddingRight: 10 }}
          type="text"
          value={prev + symbol + current}
          readOnly
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 10
          }}
        >
          {numberRows.map((row, colIndex) => (
            <div
              key={colIndex}
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row",
                alignItems: "center",
                width: "-webkit-fill-available"
              }}
            >
              {row.map((item, rowIndex) => (
                <button key={`${rowIndex}-${colIndex}`} onClick={handleClick}>
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
