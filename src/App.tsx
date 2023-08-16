import { useState } from 'react';

import { fetchQuiz, type Question } from './api';
import QuestionCard from './components/QuestionCard';
import ThemeToggle from './components/ThemeToggle';

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
    setCurrent(0);

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
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 align-middle">
      <div className="flex w-[min(95%,30rem)] flex-col items-center gap-6 rounded-xl border-4 border-indigo-600 p-5 sm:p-10">
        <h1 className="text-center text-4xl font-bold sm:text-6xl">
          React Quiz!
        </h1>
        {loading && <p>Loading question...</p>}
        {!loading && Boolean(questions.length) && (
          <p className="text-4xl font-bold sm:text-6xl">Score: {score}</p>
        )}
        {Boolean(questions.length) && !loading && (
          <>
            <QuestionCard
              questionNb={current + 1}
              totalQuestions={questions.length}
              question={questions[current].question}
              answers={questions[current].answers}
              userAnswer={userAnswers[current]}
              callback={checkAnswer}
            />
            <button
              className="btn"
              onClick={nextQuestion}
              disabled={gameOver || !userAnswers[current]}
            >
              {gameOver ? 'Game over!' : 'Next question'}
            </button>
          </>
        )}
        {(gameOver || !questions.length) && (
          <button className="btn" onClick={startQuiz}>
            Start new quiz
          </button>
        )}
      </div>
      <ThemeToggle />
    </div>
  );
}

export default App;
