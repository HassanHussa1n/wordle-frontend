import React from "react";
export default function Modal({ isCorrect, turn, word }) {
    return (

        <div className="modal">
            {isCorrect && (
                <div>
                    <h1>You Won!</h1>
                    <h2 className="word">The word was {word}!</h2>
                    <p>You found the word in {turn} guesses!</p>
                    </div>
            )}
            {!isCorrect && (
                <div>
                    <h1>You Lost...</h1>
                    <h2 className="word">The word was {word}!</h2>
                    <p>Try again another time!</p>
                    </div>
            )}
        </div>

    )
}