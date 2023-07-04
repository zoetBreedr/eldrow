import React, { useState, useEffect } from "react";
import words from "./wordsArray.json";

const WordleAttempts = () => {
  const [answer, setAnswer] = useState(["C", "R", "A", "T", "E"]); // Initial empty answer array
  const [grid, setGrid] = useState(Array(6).fill(Array(5).fill(0))); // Initial grid with grey tiles
  const [submitted, setSubmitted] = useState(false); // Indicates if the input grid and correct word have been submitted

  const handleAnswerChange = (event, index) => {
    const newAnswer = [...answer];
    newAnswer[index] = event.target.value.toUpperCase().charAt(0);
    setAnswer(newAnswer);
  };

  const handleTileClick = (event, rowIndex, colIndex) => {
    event.preventDefault();
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      const tile = newGrid[rowIndex][colIndex];

      if (tile === 0) {
        newGrid[rowIndex][colIndex] = 1; // Yellow
      } else if (tile === 1) {
        newGrid[rowIndex][colIndex] = 2; // Green
      } else {
        newGrid[rowIndex][colIndex] = 0; // Grey
      }

      return newGrid;
    });
  };

  useEffect(() => {
    if (submitted) {
      const matchingWords = words.filter((word) => {
        return answer.every(
          (letter, index) => word[index].toUpperCase() === letter
        );
      });

      console.log("Matching words:", matchingWords);
    }
  }, [submitted, answer]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-4">Attempt for the Day</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-2">
          {answer.map((letter, index) => (
            <input
              key={index}
              type="text"
              value={letter}
              onChange={(event) => handleAnswerChange(event, index)}
              maxLength={1}
              className="mr-2 p-2 border border-gray-300 w-8 text-center"
            />
          ))}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {grid.map((row, rowIndex) =>
            row.map((tile, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`h-8 w-8 ${
                  tile === 0
                    ? "bg-gray-300"
                    : tile === 1
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                <button
                  className="h-full w-full"
                  onClick={(event) =>
                    handleTileClick(event, rowIndex, colIndex)
                  }
                />
              </div>
            ))
          )}
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default WordleAttempts;
