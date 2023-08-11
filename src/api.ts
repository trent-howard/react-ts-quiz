export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

type ApiQuestions = {
  category: string;
  correct_answer: string;
  difficult: Difficulty;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type Question = Omit<
  ApiQuestions & {
    answers: string[];
  },
  'incorrect_answers'
>;

type ApiResponse = {
  results: ApiQuestions[];
};

// the API retrurns strings with html entities - wild!
function decodeEntities(s: string): string {
  const parser = new DOMParser();
  return parser.parseFromString(s, 'text/html').body.textContent as string;
}

export const fetchQuiz = async (
  amount = 10,
  difficulty?: Difficulty
): Promise<Question[]> => {
  const endpoint = new URL('https://opentdb.com/api.php');
  endpoint.searchParams.append('amount', String(amount));
  if (difficulty) {
    endpoint.searchParams.append('difficulty', difficulty);
  }

  const data = (await (await fetch(endpoint)).json()) as ApiResponse;

  return data.results.map((question: ApiQuestions) => {
    const { correct_answer, incorrect_answers, ...q } = question;
    // make list of all our answers
    incorrect_answers.push(correct_answer);
    const answers = incorrect_answers
      .map(decodeEntities)
      .sort(() => Math.random() - 0.5);

    return {
      ...q,
      question: decodeEntities(q.question),
      correct_answer: decodeEntities(correct_answer),
      answers,
    };
  });
};
