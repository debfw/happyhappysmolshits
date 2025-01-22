"use client";
import React, { useEffect, useState } from "react";

// Color Generator with a range for brighter colors
const colorGenerator = () => {
  const getRandom = (max = 256) => Math.floor(Math.random() * max);
  let red = getRandom();
  let green = getRandom();
  let blue = getRandom();
  return `rgb(${red}, ${green}, ${blue})`;
};

const Snake = () => {
  const [snakeBody, setSnakeBody] = useState<
    { x: number; y: number; color: string }[]
  >([]);
  const [eats, setEats] = useState(false);
  const [snakePosition, setSnakePosition] = useState({
    xPosition: 100,
    yPosition: 100
  });
  const [heartPosition, setHeartPosition] = useState({
    xHeartPosition: 900,
    yHeartPosition: 350
  });
  const [direction, setDirection] = useState("Right");
  const [isMoving, setIsMoving] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [speed, setSpeed] = useState(80);

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const getRandomHeartPosition = () => {
    const margin = 100;
    const getRandom = (max: number, margin: number) =>
      Math.floor(Math.random() * (max - 2 * margin)) + margin;

    setHeartPosition({
      xHeartPosition: getRandom(viewportWidth, margin),
      yHeartPosition: getRandom(viewportHeight, margin)
    });
  };

  // Initial snake
  useEffect(() => {
    const initialSnake = [
      { x: 100, y: 100, color: colorGenerator() },
      { x: 80, y: 100, color: colorGenerator() },
      { x: 60, y: 100, color: colorGenerator() },
      { x: 40, y: 100, color: colorGenerator() }
    ];
    setSnakeBody(initialSnake);
  }, []);

  // Effect to add body part when snake eats
  useEffect(() => {
    if (eats) {
      addBody();
      setEats(false);
      setSpeed((prevSpeed) => Math.max(30, prevSpeed - 20));
    }
    if (isGameOver) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [eats, isGameOver]);

  const createBodyPart = () => {
    const newPart = {
      x: snakePosition.xPosition,
      y: snakePosition.yPosition,
      color: colorGenerator()
    };
    return newPart;
  };

  const addBody = () => {
    const newBodyPart = createBodyPart();
    setSnakeBody((prevBody) => [...prevBody, newBodyPart]);
  };

  // Handle direction change and movement in a single useEffect
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isMoving) {
        setIsMoving(true);
        setIsGameOver(false);
      }

      switch (event.key) {
        case "ArrowUp":
          setDirection("Up");
          break;
        case "ArrowDown":
          setDirection("Down");
          break;
        case "ArrowLeft":
          setDirection("Left");
          break;
        case "ArrowRight":
          setDirection("Right");
          break;
        default:
          break;
      }
    };

    // Add event listener for keyboard input
    window.addEventListener("keydown", handleKeyDown);

    // Set interval for moving the snake
    const moveInterval = setInterval(() => {
      if (isMoving) {
        setSnakePosition((prevPosition) => {
          let newPosition = { ...prevPosition };
          switch (direction) {
            case "Up":
              newPosition.yPosition -= 10;
              break;
            case "Down":
              newPosition.yPosition += 10;
              break;
            case "Left":
              newPosition.xPosition -= 10;
              break;
            case "Right":
              newPosition.xPosition += 10;
              break;
            default:
              break;
          }
          if (
            newPosition.xPosition < 0 ||
            newPosition.yPosition < 0 ||
            newPosition.xPosition > viewportWidth - 20 ||
            newPosition.yPosition > viewportHeight - 20
          ) {
            setIsGameOver(true);
            clearInterval(moveInterval);
            return prevPosition;
          }

          return newPosition;
        });
      }
    }, speed);

    return () => {
      clearInterval(moveInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction, isMoving]);

  const tolerance = 20;
  useEffect(() => {
    const isWithinTolerance = (heartPosition: number, snakePosition: number) =>
      Math.abs(heartPosition - snakePosition) <= tolerance;
    if (
      isWithinTolerance(
        heartPosition.xHeartPosition,
        snakePosition.xPosition
      ) &&
      isWithinTolerance(heartPosition.yHeartPosition, snakePosition.yPosition)
    ) {
      setEats(true);
      getRandomHeartPosition();
    }
  }, [snakePosition, heartPosition]);

  useEffect(() => {
    setSnakeBody((prevBody) => {
      const newBody = prevBody.map((part, index) => {
        if (index === 0) {
          // Update head with current position
          return {
            ...part,
            x: snakePosition.xPosition,
            y: snakePosition.yPosition
          };
        } else {
          // Follow the previous part with an offset
          const newPart = {
            ...part,
            x: prevBody[index - 1].x,
            y: prevBody[index - 1].y
          };
          return newPart;
        }
      });
      return newBody;
    });
  }, [snakePosition]);

  return (
    <div style={{ position: "relative" }}>
      {/* Render the snake body */}
      {snakeBody.map((part, index) => {
        // Skip rendering the head since it’s already rendered separately
        if (index === 0) return null;

        return (
          <svg
            key={index}
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              top: `${part.y}px`,
              left: `${part.x}px`,
              transition: "top 0.1s, left 0.1s"
            }}
          >
            <circle r="10" cx="10" cy="10" fill={part.color} />
          </svg>
        );
      })}

      {/* Render the heart */}
      <div
        style={{
          position: "absolute",
          top: `${heartPosition.yHeartPosition}px`,
          left: `${heartPosition.xHeartPosition}px`,
          fontSize: "35px"
        }}
      >
        ♥
      </div>

      {/* Render the game over modal */}
      {isGameOver && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
            fontSize: "24px",
            textAlign: "center",
            borderRadius: "10px"
          }}
        >
          <h2>Looser</h2>
          <p>Try again!</p>
        </div>
      )}
    </div>
  );
};

export default Snake;
