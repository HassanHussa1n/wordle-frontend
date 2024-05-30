import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
export default function Wordle( {word} ) {

    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys} = useWordle(word)
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)


       if (isCorrect) {
          console.log('congrats!')
          setTimeout(() => setShowModal(true), 2000)
          window.removeEventListener('keyup', handleKeyup)
          
        }

        if (turn > 5) {
          console.log('unlucky...')  
          setTimeout(() => setShowModal(true), 2000)
          window.removeEventListener('keyup', handleKeyup)
          
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn])

    
    

  return (
    <>
    <div>Word = {word}</div>
     
     <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
     <Keypad usedKeys={usedKeys}/>
     {showModal && <Modal isCorrect={isCorrect} turn={turn} word={word}/>}
     </>
  );
}
