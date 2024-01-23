import { useCalculationSettings } from "../../utils/hooks/useCalculationSettings";
import { randomCalculation } from "../../utils/generateRandom";
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

function CalculationTraining() {
  const settings = useCalculationSettings((state) => state.settings);
  const { sets, values, rangefrom, rangeto, operators } = settings;
  const [problems, setProblems] = useState(
    randomCalculation(sets, values, rangefrom, rangeto, [...operators])
  );
  const [isAnswersCorrect, setIsAnswersCorrect] = useState<any[]>(
    new Array(problems.length)
  );
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    isAnswersCorrect?.fill(false);
    console.log(isAnswersCorrect);
  }, []);

  console.log(isAnswersCorrect);
  console.log(isSubmit);

  return (
    <div className="flex flex-col items-center p-8">
      <Heading>Calculation Training</Heading>
      <div className="flex">
        <div className="flex flex-col gap-2">
          {problems.map((problem, i) => {
            return (
              <div key={i}>
                <div>{problem.expression}</div>
                <div className="flex items-center">
                  <Select
                    onValueChange={(v) => {
                      const temp = [...isAnswersCorrect];
                      temp[i] = problems[i].answer === Number(v);
                      setIsAnswersCorrect(temp);
                      setIsSubmit(false);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select your answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {problem.options.map((option) => (
                          <SelectItem value={`${option}`}>{option}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {isSubmit && isAnswersCorrect[i] && <Check color="#6DD95B" />}
                  {isSubmit && !isAnswersCorrect[i] && <X color="#D95B5B" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2 my-5">
        <Button className="bg-[#4c913b]" onClick={() => setIsSubmit(true)}>
          Submit
        </Button>
        <Button
          onClick={() => {
            setProblems(
              randomCalculation(sets, values, rangefrom, rangeto, [
                ...operators,
              ])
            );
            setIsSubmit(false);
          }}
        >
          <RotateCcw />
          Refresh
        </Button>
      </div>
    </div>
  );
}

export default CalculationTraining;
