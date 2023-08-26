import { eventNames } from 'process';

export const randomCalculation = (
  sets: number,
  values: number,
  rangefrom: number,
  rangeto: number,
  operators: string[]
) => {
  const problems = [];

  for (let i = 0; i < sets; i++) {
    const problem: {
      nums: number[];
      operators: string[];
      answer: number | null;
      expression: string;
      options: number[];
    } = {
      nums: [],
      operators: [],
      answer: null,
      expression: '',
      options: [],
    };

    let evaluation = '';

    for (let j = 0; j < values - 1; j++) {
      problem.operators.push(
        operators[Math.floor(operators.length * Math.random())]
      );
    }
    for (let j = 0; j < values; j++) {
      problem.nums.push(
        rangefrom + Math.floor((rangeto - rangefrom) * Math.random())
      );
    }

    for (let j = 0; j < values; j++) {
      evaluation += ' ' + problem.nums[j] + ' ';
      if (j != values - 1) {
        evaluation += problem.operators[j];
      }
    }
    problem.answer = Math.round(eval(evaluation) * 100) / 100;

    let o = new Set<number>();
    for (let j = 0; j < 10; j++) {
      o.add(problem.answer + (-5 + Math.floor(10 * Math.random())));
      if (o.size > 3) {
        problem.options = [...o];
        break;
      }
    }

    if (!problem.options.includes(problem.answer)) {
      problem.options[Math.floor(4 * Math.random())] = problem.answer;
    }

    problem.expression = evaluation;

    problems.push(problem);
  }
  return problems;
};

console.log(randomCalculation(5, 5, 1000, 9999, ['-', '+']));
