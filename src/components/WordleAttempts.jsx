import React, { useState, useEffect } from "react";
import wordList from "./words.json";

const WordleAttempts = () => {
  const [answer, setAnswer] = useState(["", "", "", "", ""]); // Initial empty answer array
  const [grid, setGrid] = useState(Array(6).fill(Array(5).fill(0))); // Initial grid with grey tiles
  const [attempts, setAttempts] = useState([]); // Array to store the attempted words and their corresponding incorrect word lists
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
    // Generate possible incorrect words based on the patterns
    const generatePossibleWords = (pattern) => {
      const possibleWords = wordList.filter((word) =>
        isPatternPossible(pattern, word)
      );
      return possibleWords;
    };

    const isPatternPossible = (pattern, word) => {
      const wordSet = new Set(word);
      const patternSet = new Set(pattern);

      for (let i = 0; i < word.length; i++) {
        if (pattern[i] === 1 && !wordSet.has(word[i])) {
          return false;
        }
        if (pattern[i] === 0 && patternSet.has(word[i])) {
          return false;
        }
      }

      return true;
    };

    if (submitted) {
      let newAttempts = grid.map((pattern) => {
        const incorrectWords = generatePossibleWords(pattern);
        return { pattern, incorrectWords };
      });

      // Remove incorrect words sections that follow an array of [2, 2, 2, 2, 2]
      const lastNonZeroIndex = grid.findIndex((row) =>
        row.some((value) => value !== 0)
      );
      if (lastNonZeroIndex !== -1) {
        newAttempts = newAttempts.slice(0, lastNonZeroIndex + 1);
      }

      setAttempts(newAttempts);
    }
  }, [grid, submitted]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic here to process the answer and the grid
    console.log("Answer:", answer);
    console.log("Grid:", grid);
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
        {submitted && attempts.length > 0 && (
          <div className="mt-4">
            {attempts.map((attempt, index) => (
              <div key={index} className="mt-4">
                <h3 className="text-lg font-bold mb-2">{`Incorrect Words for Attempt ${
                  index + 1
                }`}</h3>
                <ul>
                  {attempt.incorrectWords.map((word, wordIndex) => (
                    <li key={wordIndex}>{word}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
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
