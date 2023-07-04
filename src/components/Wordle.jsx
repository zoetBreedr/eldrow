import React, { useState } from "react";
import WordleAttempts from "./WordleAttempts";

const Wordle = () => {
  const [word, setWord] = useState("");

  const handleInputChange = (event) => {
    setWord(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic here to check the word against the secret word and update the UI accordingly
    console.log("Submitted word:", word);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {/* <h1 className="text-3xl font-bold mb-4">Wordle</h1>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={word}
          onChange={handleInputChange}
          className="mr-2 p-2 border border-gray-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Guess
        </button>
      </form> */}
      <WordleAttempts />
    </div>
  );
};

export default Wordle;
