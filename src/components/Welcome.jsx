import React, { useEffect, useState } from "react";
import axios from "axios";
import Wordle from "./Wordle";

function Welcome() {
  const [word, setWord] = useState(null);


  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get("http://localhost:4000/words");
        console.log(response.data.data)
        const fetchedWords = response.data.data.map(wordle => wordle.word);
        const randomWord = fetchedWords[Math.floor(Math.random()*fetchedWords.length)]
        setWord(randomWord)
      } catch (error) {
        console.error("Error fetching the word: ", error);
      }
    };

    fetchWords();
  }, [setWord]);


  return (
    <div>
      <h1>Welcome!</h1>
      <p>You have successfully logged in.</p>
      {word && <Wordle word={word} />}
    </div>
  );
}

export default Welcome;
