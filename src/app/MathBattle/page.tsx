"use client";
import { useState } from "react";

const MathBattle = () => {
  const [question, setQuestion] = useState("1+1=?");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(2);
  const [isWrong, setIsWrong] = useState(false);
  const [sec, setSec] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [score, setScore] = useState(0);

  const generateQues = () => {
    let a = Math.floor(Math.random() * 100);
    let b = Math.floor(Math.random() * 100);
    let symbol = ["+", "-", "*"][Math.floor(Math.random() * 3)];

    let newResult = 0;
    switch (symbol) {
      case "+":
        newResult = a + b;
        break;
      case "-":
        newResult = a - b;
        break;
      case "*":
        newResult = a * b;
        break;
    }
    setResult(newResult);

    console.log({ a, b, newResult, symbol });
    setQuestion(`${a}${symbol}${b}=?`);
  };

  const timer = () => {
    let intervalId = setInterval(() => {
      setSec((prev) => {
        if (prev === 0) {
          clearInterval(intervalId);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = () => {
    if (Number(inputValue) === result) {
      generateQues();
      setScore((prev) => prev + 1);
    } else {
      setIsWrong(true);
      setInputValue("");
    }
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <button
        style={{
          background: "white",
          color: "pink",
          borderRadius: 5,
          padding: 10,
          marginTop: 40
        }}
        onClick={timer}
      >
        Start Game
      </button>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          marginTop: 20
        }}
      >
        <div
          style={{
            display: "flex",
            background: "pink",
            width: 200,
            height: 400,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <p style={{ fontSize: 100 }}>{isTimeUp ? "TIME UP" : sec}</p>
          <p style={{ fontSize: 50 }}>{isTimeUp ? `Your score : ${score}` : ""}</p>

          {isWrong ? (
            <p
              style={{
                color: "green",
                fontSize: 30
              }}
            >
              Wrong!
            </p>
          ) : (
            ""
          )}
          <label htmlFor="inputText" style={{ color: "purple" }}>
            Question
          </label>
          <input
            type="text"
            value={question}
            readOnly
            style={{
              background: "pink",
              height: 25,
              color: "black",
              padding: 10,
              textAlign: "center"
            }}
          />
          <label htmlFor="inputText" style={{ color: "purple" }}>
            Your Answer
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              background: "orange",
              height: 25,
              color: "black",
              padding: 5
            }}
          />
          <button
            type="submit"
            style={{
              background: "darkOrange",
              height: 25,
              marginTop: 40,
              padding: 10,
              alignItems: "center",
              display: "flex",
              borderRadius: 5
            }}
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MathBattle;
