import { useState } from "react";

const useWordle = (word) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({})

  const formatGuess = () => {
    let wordArray = [...word];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    //check for green letters
    formattedGuess.forEach((l, i) => {
      if (wordArray[i] === l.key) {
        formattedGuess[i].color = 'green'
        wordArray[i] = null
      }
    })

    //check for yellow letters
    formattedGuess.forEach((l, i) => {
      if (wordArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow'
        wordArray[wordArray.indexOf(l.key)] = null
      }
    })

    return formattedGuess
  };

  const addNewGuess = (formattedGuess) => {

    if (currentGuess === word) {
      setIsCorrect(true)
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess]

    })
    setTurn((prevTurn) => {
      return prevTurn + 1

    })
    setUsedKeys((prevUsedKeys) => {
      let newKeys = {...prevUsedKeys}

      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key]

        if (l.color === 'green') {
          newKeys[l.key] = 'green'
          return
        }
        if (l.color === 'yellow' && currentColor != 'green') {
          newKeys[l.key] = 'yellow'
          return
        }
        if (l.color === 'grey' && currentColor != 'green' && currentColor != 'yellow') {
          newKeys[l.key] = 'grey'
          return
        }
      })
      return newKeys
    })
    setCurrentGuess('')

  };

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      //only add guess if letters are 5
      if (turn > 5) {
        console.log("Youve used all ur guesses");
        return;
      }
      //not allow duplicates
      if (history.includes(currentGuess)) {
        console.log("you already tried that");
        return;
      }
      //check for length
      if (currentGuess.length != 5) {
        console.log("word must be 5 chars long");
        return;
      }

     const formatted =  formatGuess();
     addNewGuess(formatted)
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
