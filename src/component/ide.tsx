import { useState, useEffect } from "react";
import { loadPyodide } from "pyodide";
import * as React from "react";
import Input from "./form/input";
import Button from "./form/button";
import AddIcon from "@assets/svg/add_ico.svg"
const PyodideDynamicInputApp = () => {

  const [pyodide, setPyodide] = useState<any>(null);
  const [inputs, setInputs] = useState([{ id: 1, value: "" }]);
  const [result, setResult] = useState("");

  // Load Pyodide on component mount
  useEffect(() => {
    const initPyodide = async () => {
      const pyodideInstance = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.0/full/",
      })
      setPyodide(pyodideInstance);
    };
    initPyodide();
  }, []);

  // Handle input field changes
  const handleInputChange = (id: number, value: string) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  // Add a new input field
  const addInputField = () => {
    const newId = inputs.length > 0 ? inputs[inputs.length - 1].id + 1 : 1;
    setInputs([...inputs, { id: newId, value: "" }]);
  };

  // Remove an input field
  const removeInputField = (id: number) => {
    setInputs((prevInputs) => prevInputs.filter((input) => input.id !== id));
  };

  // Run the combined Python script
  const runPyodideScript = async () => {
    if (!pyodide) return;

    try {
      // Combine all input values into a single Python script
      const pythonScript = inputs
        .map((input) => input.value)
        .filter((value) => value.trim() !== "") // Filter out empty inputs
        .join("\n"); // Join scripts with new lines
      const result = await pyodide?.runPythonAsync(pythonScript);
      setResult(result);
    } catch (error) {
      console.error("Error running Python script:", error);
      setResult("Error in computation.");
    }
  };
  return (
    <div className="multi-input">
        <strong >Input</strong>
      {inputs.map((input, key) => (
        <div key={input.id} className="mt-3 d-flex align-items-start">
          <Input
            type='textarea'
            className='w-100'
            value={input.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(input.id, e.target.value)}
          />
          {key !== 0 && <Button className="btn"  onClick={() => removeInputField(input.id)}>Remove</Button>}
        </div>
      ))}
      <div className="d-flex justify-content-end">
        <Button onClick={addInputField} className='btn d-flex align-items-center'>Add More <img className="ms-2" src={AddIcon} /></Button>
        <Button onClick={runPyodideScript} className='btn btn-primary' disabled={!pyodide}>
          Run Pyodide Script
        </Button>
      </div>
      {result && <div className="mt-3">
        <strong>Output:</strong>
        <div className="multi-input-output mt-3">
          {result}
        </div>
      </div>}
    </div>
  );
};

export default PyodideDynamicInputApp;
