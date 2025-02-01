import { useDualCalculationSettings } from "../../utils/hooks/useCalculationSettings";
import { dualRangeCalculation } from "../../utils/generateRandom";
import Heading from "../Heading";
import { Button } from "../ui/button";
import { Check, RotateCcw, X } from "lucide-react";

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
import { useCounter } from "../../utils/hooks/useCounter";

function DualCalculationTraining() {
  const settings = useDualCalculationSettings((state) => state.settings);
  const { fistValueRange, secondValueRange, operator, answerType } = settings;
  const { counter, incrementCounter, resetCounter } = useCounter();
  const [problems, setProblems] = useState(
    dualRangeCalculation(fistValueRange, secondValueRange, operator)
  );
  const [isAnswersCorrect, setIsAnswersCorrect] = useState<any[]>(
    new Array(problems.length)
  );
  const [refresh, setRefresh] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);

  useEffect(() => {
    isAnswersCorrect?.fill(false);
    if (!refresh) {
      setRefresh(true);
    }
  }, [refresh]);

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
        <Heading>Dual Calculation Training</Heading>
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
      {refresh && (
        <>
          <div className="flex">
            <div className="flex flex-col gap-2">
              {problems.map((problem, i) => {
                return (
                  <div key={i}>
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
                      {isSubmit && isAnswersCorrect[i] && (
                        <Check color="#6DD95B" />
                      )}
                      {isSubmit && !isAnswersCorrect[i] && (
                        <X color="#D95B5B" />
                      )}
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
                  dualRangeCalculation(
                    fistValueRange,
                    secondValueRange,
                    operator
                  )
                );
                setIsSubmit(false);
                setShowSolutions(false);
                isAnswersCorrect?.fill(false);
                setRefresh(false);
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
        </>
      )}
    </div>
  );
}

export default DualCalculationTraining;
