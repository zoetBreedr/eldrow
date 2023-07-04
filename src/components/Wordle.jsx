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
      <WordleAttempts />
    </div>
  );
};

export default Wordle;
