import { type UserAnswer } from '../App';

type Props = {
  question: string;
  answers: string[];
  callback: React.MouseEventHandler<HTMLButtonElement>;
  userAnswer: UserAnswer;
  questionNb: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNb,
  totalQuestions,
}) => {
  return (
    <div className="text-md flex w-full flex-col items-center gap-6 sm:text-xl">
      <p>
        Question: {questionNb} / {totalQuestions}
      </p>
      <p className="text-center">{question}</p>
      <div className="flex flex-col justify-center gap-3">
        {answers.map((answer) => (
          <button
            className={`btn ${
              userAnswer.correctAnswer === answer ? 'btn-green' : ''
            } ${
              userAnswer.answer === answer && !userAnswer.isCorrect
                ? 'btn-red'
                : ''
            }`}
            key={answer}
            value={answer}
            disabled={Boolean(userAnswer)}
            onClick={callback}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
