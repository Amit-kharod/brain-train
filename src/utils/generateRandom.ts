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
    let displayExpression = "";

    for (let j = 0; j < values - 1; j++) {
      const operator = operators[Math.floor(operators.length * Math.random())];
      problem.operators.push(operator);
    }
    for (let j = 0; j < values; j++) {
      problem.nums.push(
        rangefrom + Math.floor((rangeto - rangefrom) * Math.random())
      );
    }

    for (let j = 0; j < values; j++) {
      evaluation += " " + problem.nums[j] + " ";
      displayExpression += " " + problem.nums[j] + " ";
      if (j != values - 1) {
        evaluation += problem.operators[j];
        displayExpression +=
          problem.operators[j] === "/" ? "÷" : problem.operators[j];
      }
    }
    problem.answer = Math.round(eval(evaluation) * 100) / 100;
    problem.expression = displayExpression;

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

    problem.expression = `${problem.nums[0]} ${
      operator === "/" ? "÷" : operator
    } ${problem.nums[1]}`;
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
  let randomValues: number[] = [];

  if (range.includes("-")) {
    const [start, end] = range.split("-").map(Number);
    for (let i = start; i <= end; i++) {
      randomValues.push(i);
    }
  } else {
    randomValues = [Number(range)];
  }

  for (let i = 0; i < 5; i++) {
    const problem: {
      num: number;
      power: string | number;
      answer: number;
      options: number[];
      isRoot?: boolean;
    } = {
      num: 0,
      power: 2,
      answer: 0,
      options: [],
      isRoot: false,
    };

    let baseNum;
    switch (powerMethod) {
      case "square":
        baseNum = randomValues[Math.floor(randomValues.length * Math.random())];
        problem.num = baseNum;
        problem.power = 2;
        problem.answer = Math.pow(baseNum, 2);
        break;
      case "cube":
        baseNum = randomValues[Math.floor(randomValues.length * Math.random())];
        problem.num = baseNum;
        problem.power = 3;
        problem.answer = Math.pow(baseNum, 3);
        break;
      case "Square/Cube":
        baseNum = randomValues[Math.floor(randomValues.length * Math.random())];
        problem.num = baseNum;
        problem.power = Math.random() < 0.5 ? 2 : 3;
        problem.answer = Math.pow(baseNum, problem.power);
        break;
      case "squareRoot":
        baseNum = randomValues[Math.floor(randomValues.length * Math.random())];
        problem.num = Math.pow(baseNum, 2); // Store the square
        problem.power = "√";
        problem.answer = baseNum;
        problem.isRoot = true;
        break;
      case "cubeRoot":
        baseNum = randomValues[Math.floor(randomValues.length * Math.random())];
        problem.num = Math.pow(baseNum, 3); // Store the cube
        problem.power = "∛";
        problem.answer = baseNum;
        problem.isRoot = true;
        break;
      case "bothRoots":
        baseNum = randomValues[Math.floor(randomValues.length * Math.random())];
        const isSquareRoot = Math.random() < 0.5;
        problem.num = isSquareRoot
          ? Math.pow(baseNum, 2)
          : Math.pow(baseNum, 3);
        problem.power = isSquareRoot ? "√" : "∛";
        problem.answer = baseNum;
        problem.isRoot = true;
        break;
    }

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
