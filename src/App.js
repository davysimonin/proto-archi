import React, { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import Quiz from './components/Quiz'
import Feedback from './components/Feedback'
import { quiz } from './utils/quizz';

const _validationSubject = new Subject();
const validationObservable$ = _validationSubject.asObservable();
const validate = () => {
  _validationSubject.next(true);
}

export default () => {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const nextQuestion = () => {
    if (questionIndex + 1 < quiz.questions.length) {
      setQuestionIndex(questionIndex + 1)
      setIsAnswerCorrect(null)
      setFeedback(null);
    }
  }
  useEffect(() => {
    console.log(`answer is: ${isAnswerCorrect}`);
  }, [isAnswerCorrect]);
  

  return (
    <>
      <Quiz
        data={quiz.questions[questionIndex]}
        setIsAnswerCorrect={setIsAnswerCorrect}
        validationObservable$={validationObservable$}
        setFeedback={setFeedback}
      />
      {console.log(feedback)}
      {feedback ?
        <Feedback data={feedback} />
        : null
      }
      <button onClick={validate}>Valider</button>
      {isAnswerCorrect !== null ? 
        <button onClick={e => nextQuestion()}>Question suivante</button>
        : <button onClick={e => nextQuestion()}>Passer la question</button>
      }
    </>
  );
}