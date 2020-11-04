import React, { useEffect, useState } from 'react'
import { BehaviorSubject } from 'rxjs';

import QuizVue from "./QuizVue"

let _viewStateBSubject = new BehaviorSubject({state: "untouched"});
let viewState$ = _viewStateBSubject.asObservable();
let subscriptions = [];

export default ({ data, validationObservable$, setIsAnswerCorrect, setFeedback }) => {
    const [quizAnswer, setQuizAnswer] = useState(0);
    const reactToInput = (userInput) => {
        setQuizAnswer(userInput)
    }

    useEffect(() => {
        if (quizAnswer) {
          subscriptions.forEach(sub => {sub.unsubscribe()});
          subscriptions = [];
          subscriptions.push(validationObservable$.subscribe((validate) => {
            console.log('validate', validate);
            if (!validate) return;
    
            console.log("check answer", quizAnswer);
            setIsAnswerCorrect(quizAnswer === data.correctAnswer);
            _viewStateBSubject.next(quizAnswer === data.correctAnswer ? {state: "correct"} : {state: "incorrect", quizAnswer: data.correctAnswer});
            setFeedback(data.explanation);
          }));
        }
        return () => {
          subscriptions.forEach(sub => {sub.unsubscribe()});
        }
    }, [quizAnswer]);

    useEffect(() => {
        _viewStateBSubject.next({state: "untouched"});
        setQuizAnswer(null)
    }, [data])

    return (
        <>
            <h1>Quiz</h1>
            <div>
                <QuizVue data={data.viewData} reactToInput={reactToInput} viewState$={viewState$} />
            </div>
        </>

    )
}