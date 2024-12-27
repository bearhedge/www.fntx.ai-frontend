import * as React from "react";
import { useState } from "react";
import Button from "./form/button";
import Input from "./form/input";

const MultiCodeEvaluator: React.FC = () => {
  const [codeInputs, setCodeInputs] = useState<string[]>(["", ""]); // State for multiple textareas
  const [result, setResult] = useState<string>(""); // State for evaluation result

  // Update the specific code input
  const updateCodeInput = (index: number, value: string): void => {
    const updatedInputs = [...codeInputs];
    updatedInputs[index] = value;
    setCodeInputs(updatedInputs);
  };

  // Evaluate the combined code from all textareas
  const evaluateCombinedCode = (): void => {
    const combinedCode = codeInputs.join("\n"); // Combine all code inputs

    try {
      // Create a new function to execute code in the shared context
      const functionBody = `
        with (evaluateCombinedCode) {
          ${combinedCode}
        }
      `;
      const func = new Function("return", functionBody);

      // Execute the function with the shared context
      const evalResult = func();
      console.log(evalResult);

      // Handle undefined results
      setResult(evalResult !== undefined ? evalResult.toString() : "undefined");
    } catch (error) {
      setResult(`Error: ${(error as Error).message}`);
    }
  };

  // Add a new empty textarea
  const addTextarea = (): void => {
    setCodeInputs([...codeInputs, ""]);
  };

  return (
    <div className="multi-input">
      {codeInputs.map((code, index) => (
        <Input
          key={index}
          value={code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCodeInput(index, e.target.value)}
        />
      ))}
      <div className="d-flex justify-content-end">
        <Button className='btn' onClick={evaluateCombinedCode}>Run Combined Code</Button>
        <Button onClick={addTextarea} className='btn'>
          Add Code Block
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <strong>Output:</strong>
        <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f9f9f9" }}>
          {result}
        </div>
      </div>
    </div>
  );
};

export default MultiCodeEvaluator;
