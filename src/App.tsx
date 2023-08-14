import { useState } from 'react';

import { fetchQuiz, type Question } from './api';
import QuestionCard from './components/QuestionCard';

import './index.css';

export type UserAnswer = {
  answer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const startQuiz = async () => {
    setLoading(true);
    setUserAnswers([]);

    const questions = await fetchQuiz();

    setQuestions(questions);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    const correctAnswer = questions[current].correct_answer;
    const isCorrect = correctAnswer === answer;

    setUserAnswers((a) => [...a, { answer, correctAnswer, isCorrect }]);
  };

  const nextQuestion = () =>
    setCurrent((c) => Math.min(c + 1, questions.length - 1));

  const gameOver =
    userAnswers.length === questions.length && Boolean(questions.length);
  const score = userAnswers.filter((ans) => ans.isCorrect).length;

  return (
    <div className="flex h-screen w-full items-center justify-center p-4 align-middle">
      <div className="flex flex-col items-center gap-6 rounded-xl border-4 border-indigo-600 p-10">
        <h1 className="text-6xl font-bold">React Quiz!</h1>
        {(gameOver || !questions.length) && (
          <div>
            <button className="btn" onClick={startQuiz}>
              Start
            </button>
          </div>
        )}
        {loading && <p>Loading question...</p>}
        {!gameOver && !loading && (
          <p className="text-4xl font-bold">Score: {score}</p>
        )}
        {Boolean(questions.length) && (
          <>
            <QuestionCard
              questionNb={current + 1}
              totalQuestions={questions.length}
              question={questions[current].question}
              answers={questions[current].answers}
              userAnswer={userAnswers[current] || ''}
              callback={checkAnswer}
            />
            <div>
              <button
                className="btn"
                onClick={nextQuestion}
                disabled={gameOver || !userAnswers[current]}
              >
                Next question
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
