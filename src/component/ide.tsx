import { useState, useEffect } from "react";

declare global {
  interface Window {
    pyodide: any;
    loadPyodide: () => Promise<void>;
  }
}

const PyodideExample: React.FC = () => {
  const [inputs, setInputs] = useState<string[]>([""]);
  const [output, setOutput] = useState<string>("");
  const [pyodideReady, setPyodideReady] = useState<boolean>(false);

  // Load Pyodide once when the component mounts
  useEffect(() => {
    const loadPyodide = async () => {
      await window.loadPyodide();
      setPyodideReady(true);
    };
    loadPyodide();
  }, []);

  // Function to handle input changes dynamically
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  // Function to add a new input field
  const addInputField = () => {
    setInputs([...inputs, ""]);
  };

  // Function to remove an input field
  const removeInputField = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  // Function to execute Python code
  const executePythonCode = async () => {
    if (!pyodideReady) return;
    
    const pythonCode = `
def process_inputs(inputs):
    # Here you can process the inputs in any way
    result = sum([float(i) for i in inputs])
    return result

output = process_inputs(${JSON.stringify(inputs)});
output
    `;
    
    const result = await window.pyodide.runPython(pythonCode);
    setOutput(result);
  };

  return (
    <div>
      <h2>Pyodide Example with Multiple Inputs</h2>

      {/* Render input fields dynamically */}
      {inputs.map((input, index) => (
        <div key={index}>
          <input
            type="number"
            value={input}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <button onClick={() => removeInputField(index)}>Remove</button>
        </div>
      ))}
      
      <button onClick={addInputField}>Add Input</button>
      <button onClick={executePythonCode}>Execute Python Code</button>

      <div>
        <h3>Output: {output}</h3>
      </div>
    </div>
  );
};

export default PyodideExample;
