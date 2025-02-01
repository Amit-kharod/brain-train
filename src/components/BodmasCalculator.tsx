import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Heading from "./Heading";

interface Step {
  expression: string;
  explanation: string;
}

function BodmasCalculator() {
  const [expression, setExpression] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const solveBodmas = () => {
    try {
      setError("");
      const steps: Step[] = [];
      let currentExpression = expression
        .replace(/\s+/g, "")
        .replace(/[{[]/g, "(")
        .replace(/[}\]]/g, ")")
        .replace(/(\d+)\(/g, "$1*(")
        .replace(/\)(\d+)/g, ")*$1")
        .replace(/\)\(/g, ")*(")
        .replace(/of/g, "@");

      while (currentExpression.includes("(")) {
        const bracketRegex = /\(([^()]+)\)/;
        const match = currentExpression.match(bracketRegex);
        if (match) {
          const bracketContent = match[1];
          const bracketResult = evaluateExpression(bracketContent);
          steps.push({
            expression: currentExpression.replace(/@/g, "of"),
            explanation: `Solving bracket: (${bracketContent.replace(
              /@/g,
              "of"
            )}) = ${bracketResult}`,
          });
          currentExpression = currentExpression.replace(
            `(${bracketContent})`,
            bracketResult.toString()
          );
        }
      }

      const finalResult = evaluateExpression(currentExpression, steps);
      setSteps(steps);
      setResult(finalResult);
    } catch (err) {
      setError("Invalid expression. Please check your input.");
      setSteps([]);
      setResult(null);
    }
  };

  const evaluateExpression = (expr: string, steps: Step[] = []): number => {
    let currentExpr = expr;

    const ofRegex = /(-?\d*\.?\d+)@(-?\d*\.?\d+)/;
    while (ofRegex.test(currentExpr)) {
      currentExpr = currentExpr.replace(ofRegex, (_, a, b) => {
        const result = Number(a) * Number(b);
        steps.push({
          expression: currentExpr.replace(/@/g, "of"),
          explanation: `${a} of ${b} = ${result}`,
        });
        return result.toString();
      });
    }

    const mulDivRegex = /(-?\d*\.?\d+)([*/])(-?\d*\.?\d+)/;
    while (mulDivRegex.test(currentExpr)) {
      currentExpr = currentExpr.replace(mulDivRegex, (_, a, op, b) => {
        const result =
          op === "*" ? Number(a) * Number(b) : Number(a) / Number(b);
        steps.push({
          expression: currentExpr.replace(/@/g, "of"),
          explanation: `${a} ${op} ${b} = ${result}`,
        });
        return result.toString();
      });
    }

    const addSubRegex = /(-?\d*\.?\d+)([+-])(-?\d*\.?\d+)/;
    while (addSubRegex.test(currentExpr)) {
      currentExpr = currentExpr.replace(addSubRegex, (_, a, op, b) => {
        const result =
          op === "+" ? Number(a) + Number(b) : Number(a) - Number(b);
        steps.push({
          expression: currentExpr.replace(/@/g, "of"),
          explanation: `${a} ${op} ${b} = ${result}`,
        });
        return result.toString();
      });
    }

    return Number(currentExpr);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <Heading>BODMAS Calculator</Heading>
      <div className="w-full max-w-xl mt-8">
        <div className="flex gap-4 mb-6">
          <Input
            type="text"
            placeholder="Enter expression (e.g., 2*(3+4)/2)"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="text-black"
          />
          <Button onClick={solveBodmas}>Solve</Button>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {steps.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Solution Steps:</h3>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="border-b border-gray-700 pb-2">
                  <div className="text-gray-400">Step {index + 1}:</div>
                  <div>{step.explanation}</div>
                </div>
              ))}
              {result !== null && (
                <div className="pt-4 font-semibold text-green-500">
                  Final Result: {result}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BodmasCalculator;
