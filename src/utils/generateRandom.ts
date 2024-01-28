import { fraction } from "mathjs";

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
      expression: "",
      options: [],
    };

    let evaluation = "";

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
      evaluation += " " + problem.nums[j] + " ";
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

export const dualRangeCalculation = (
  fistValueRange: string,
  secondValueRange: string,
  operator: string
) => {
  const problems = [];

  for (let i = 0; i < 5; i++) {
    const problem: {
      nums: number[];
      operators: string[];
      answer: number | null | string;
      expression: string;
      options: (number | string)[];
    } = {
      nums: [],
      operators: [],
      answer: null,
      expression: "",
      options: [],
    };
    let randomValues: any = [];
    fistValueRange.split(",").map((val) => {
      if (val.split("-").length < 2) {
        randomValues.push(val);
      } else {
        let rangefrom = 0;
        let rangeto = 0;
        val.split("-").map((item, i) => {
          if (i == 0) {
            rangefrom = Number(item);
          } else {
            rangeto = Number(item);
          }
        });

        for (let j = 0; j <= rangeto - rangefrom; j++) {
          randomValues.push(rangefrom + j);
        }
      }
    });
    problem.nums.push(
      randomValues[Math.floor(randomValues.length * Math.random())]
    );
    problem.operators.push(operator);
    randomValues = [];
    secondValueRange.split(",").map((val) => {
      if (val.split("-").length < 2) {
        randomValues.push(val);
      } else {
        let rangefrom = 0;
        let rangeto = 0;
        val.split("-").map((item, i) => {
          if (i == 0) {
            rangefrom = Number(item);
          } else {
            rangeto = Number(item);
          }
        });

        for (let j = 0; j <= rangeto - rangefrom; j++) {
          randomValues.push(rangefrom + j);
        }
      }
    });
    problem.nums.push(
      randomValues[Math.floor(randomValues.length * Math.random())]
    );

    problem.expression =
      problem.nums[0] + problem.operators[0] + problem.nums[1];
    if (operator === "/") {
      const { n, d } = fraction(problem.nums[0], problem.nums[1]);
      problem.answer = n + "/" + d;

      //generating random options
      let o = new Set<string>();
      for (let j = 0; j < 10; j++) {
        o.add(n + (-5 + Math.floor(10 * Math.random())) + "/" + d);
        if (o.size > 3) {
          problem.options = [...o];
          break;
        }
      }

      if (!problem.options.includes(problem.answer)) {
        problem.options[Math.floor(4 * Math.random())] = problem.answer;
      }
    } else {
      problem.answer = Math.round(eval(problem.expression) * 100) / 100;

      //generating random options
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
    }

    problems.push(problem);
  }
  return problems;
};

export const randomPower = (range: string, powerMethod: string) => {
  const problems = [];

  for (let i = 0; i < 10; i++) {
    const problem: {
      num: number;
      power: number;
      answer: number | null;
      expression: string;
      options: number[];
    } = {
      num: 0,
      power: 2,
      answer: null,
      expression: "",
      options: [],
    };
    let randomValues: any = [];
    let powers = [2, 3];
    range.split(",").map((val) => {
      if (val.split("-").length < 2) {
        randomValues.push(val);
      } else {
        let rangefrom = 0;
        let rangeto = 0;
        val.split("-").map((item, i) => {
          if (i == 0) {
            rangefrom = Number(item);
          } else {
            rangeto = Number(item);
          }
        });
        randomValues.push(
          rangefrom + Math.floor((rangeto - rangefrom) * Math.random())
        );
      }
    });
    problem.num = randomValues[Math.floor(randomValues.length * Math.random())];
    if (powerMethod === "square") {
      problem.power = 2;
    } else if (powerMethod === "cube") {
      problem.power = 3;
    } else {
      problem.power = powers[Math.floor(powers.length * Math.random())];
    }

    problem.expression = problem.num + "**" + problem.power;
    problem.answer = Math.round(eval(problem.expression) * 100) / 100;

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
    problems.push(problem);
  }
  return problems;
};

console.log(randomCalculation(5, 5, 1000, 9999, ["-", "+"]));
