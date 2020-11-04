import React, { useState, useEffect } from 'react';
import { quiz } from '../utils/quizz'
export default ({ data, reactToInput, viewState$ }) => {
    const [quizAnswer, setQuizAnswer] = useState(1);
    const [isCorrect, setIsCorrect] = useState(null);

    useEffect(() => {
        if (viewState$) {
            const sub = viewState$.subscribe((state) => {
                console.log("change state", state);
                if (state.state === "correct") setIsCorrect(true);
                else if (state.state === "incorrect") {
                    setIsCorrect(false);
                    setQuizAnswer(state.quizAnswer);
                }
                else if (state.state === "untouched") setIsCorrect(null);
            })
            return () => {
                sub.unsubscribe();
            }
        }

    }, [viewState$]);

    useEffect(() => {
      reactToInput(quizAnswer)
    }, [quizAnswer]);

    return (
        <>
            <h2>{data.question}</h2>
            <select value={quizAnswer} onChange={e => setQuizAnswer(e.currentTarget.value)}>
               {data.answers.map((answer, index) => (
                   <option value={index + 1}>{answer}</option>
               ))}
            </select>   
            {isCorrect ?
                <p>{data.messageForCorrectAnswer}</p>
              : isCorrect === false ?
                    <p>{data.messageForIncorrectAnswer}</p>
              : null
            }
        </>
    )
}