import { useCalculationSettings } from "../../utils/hooks/useCalculationSettings";
import { randomCalculation } from "../../utils/generateRandom";
import Heading from "../Heading";
import { Button } from "../ui/button";
import { Check, RotateCcw, X } from "lucide-react";
import { useCounter } from "../../utils/hooks/useCounter";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

function CalculationTraining() {
  const settings = useCalculationSettings((state) => state.settings);
  const { sets, values, rangefrom, rangeto, operators, answerType } = settings;
  const { counter, incrementCounter, resetCounter } = useCounter();
  const [problems, setProblems] = useState(
    randomCalculation(sets, values, rangefrom, rangeto, [...operators])
  );
  const [isAnswersCorrect, setIsAnswersCorrect] = useState<any[]>(
    new Array(problems.length)
  );
  const [isSubmit, setIsSubmit] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);

  useEffect(() => {
    isAnswersCorrect?.fill(false);
    console.log(isAnswersCorrect);
  }, []);

  console.log(isAnswersCorrect);
  console.log(isSubmit);

  const renderAnswerInput = (problem: any, index: number) => {
    if (answerType === "mcq") {
      return (
        <Select
          onValueChange={(v) => {
            const temp = [...isAnswersCorrect];
            temp[index] = problem.answer === Number(v);
            setIsAnswersCorrect(temp);
            setIsSubmit(false);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select your answer" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {problem.options.map((option: number) => (
                <SelectItem key={option} value={`${option}`}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        type="number"
        className="w-[180px] text-black"
        placeholder="Enter your answer"
        onChange={(e) => {
          const temp = [...isAnswersCorrect];
          temp[index] = problem.answer === Number(e.target.value);
          setIsAnswersCorrect(temp);
          setIsSubmit(false);
        }}
      />
    );
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex justify-between items-center w-full max-w-xl mb-4">
        <Heading>Calculation Training</Heading>
        <div className="flex items-center gap-2">
          <span className="text-lg">Set {counter}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={resetCounter}
            className="bg-transparent text-white hover:text-black"
          >
            Reset Counter
          </Button>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-2">
          {problems.map((problem, i) => {
            return (
              <div key={i} className="flex flex-col items-center">
                <div>
                  {problem.expression}
                  {showSolutions && (
                    <span className="ml-2 text-green-500">
                      = {problem.answer}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  {renderAnswerInput(problem, i)}
                  {isSubmit && isAnswersCorrect[i] && <Check color="#6DD95B" />}
                  {isSubmit && !isAnswersCorrect[i] && <X color="#D95B5B" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2 my-5">
        <Button
          onClick={() => {
            setProblems(
              randomCalculation(sets, values, rangefrom, rangeto, [
                ...operators,
              ])
            );
            setIsSubmit(false);
            setShowSolutions(false);
            incrementCounter();
          }}
        >
          <RotateCcw />
          Refresh
        </Button>
        <Button className="bg-[#4c913b]" onClick={() => setIsSubmit(true)}>
          Submit
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowSolutions(!showSolutions)}
          className="bg-transparent text-white hover:text-black"
        >
          {showSolutions ? "Hide Solutions" : "Show Solutions"}
        </Button>
      </div>
    </div>
  );
}

export default CalculationTraining;
