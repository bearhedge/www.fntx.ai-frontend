import { useState, useEffect } from "react";

const PyodideDynamicInputApp = () => {

  const [pyodide, setPyodide] = useState<any>(null);
  const [inputs, setInputs] = useState([{ id: 1, value: "" }]);
  const [result, setResult] = useState("");

  // Load Pyodide on component mount
  useEffect(() => {
    const loadPyodide = async () => {
        const loadPyodide = (window as any).loadPyodide;
        console.log(loadPyodide, window);
        
      const pyodideInstance = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.2/full',
      });
      setPyodide(pyodideInstance);
    };
    loadPyodide();
  }, []);

  // Handle input field changes
  const handleInputChange = (id:number, value:string) => {
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
  const removeInputField = (id:number) => {
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
    <div>
      <h1>Pyodide Dynamic Input Example</h1>
      {inputs.map((input) => (
        <div key={input.id} style={{ marginBottom: "10px" }}>
          <textarea
            rows={3}
            placeholder={`Python code for Input ${input.id}`}
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            style={{ width: "300px" }}
          />
          <button onClick={() => removeInputField(input.id)}>Remove</button>
        </div>
      ))}
      <button onClick={addInputField}>Add Input</button>
      <button onClick={runPyodideScript} disabled={!pyodide}>
        Run Pyodide Script
      </button>
      <h2>Result:</h2>
      <pre>{result}</pre>
    </div>
  );
};

export default PyodideDynamicInputApp;
