import React, { useState, useEffect } from "react";
import words from "./words.json";
import wordsArray from "./wordsArray.json";

const WordleAttempts = () => {
  const [answer, setAnswer] = useState(["C", "R", "A", "T", "E"]); // Initial empty answer array
  const [grid, setGrid] = useState(Array(6).fill(Array(5).fill(0))); // Initial grid with grey tiles
  const [submitted, setSubmitted] = useState(false); // Indicates if the input grid and correct word have been submitted
  const [matchingWords, setMatchingWords] = useState([]);

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

  const attempt = [[2, 0, 0, 2, 2]];
  const attemptLetters = [["c", "r", null, null, "e"]];

  useEffect(() => {
    if (submitted) {
      const filteredArray = wordsArray.filter((item) => {
        return attemptLetters[0].every((pattern, index) => {
          return (
            pattern === null || pattern === item[index] || item[index] === null
          );
        });
      });

      console.log(filteredArray);
      // const matchingWords = words.filter((word) => {
      //   const wordLetters = attempt[0].map((value, index) => {
      //     if (value === 2) {
      //       // console.log(`Assigning answer[${index}]: ${answer[index]}`);
      //       return answer[index];
      //     }
      //     // console.log(`Not assigning answer[${index}]`);
      //     return 0;
      //   });

      //   console.log(`Word letters: ${wordLetters.join("")}`);
      //   console.log(`Word: ${word.toUpperCase()}`);

      //   // const lastFourLetters = wordLetters.slice(1).join("").toUpperCase();
      //   // const attemptLetters = word.slice(1).toUpperCase();

      //   // console.log(`lastFourLetters: ${lastFourLetters}`);
      //   // console.log(`attemptLetters: ${attemptLetters}`);

      //   // return lastFourLetters === attemptLetters;
      // });

      // console.log("Matching words:", matchingWords);
      // setMatchingWords(matchingWords);
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
        {matchingWords.length > 0 && (
          <div className="mt-4">
            <h3>Matching Words:</h3>
            <ul>
              {matchingWords.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default WordleAttempts;
