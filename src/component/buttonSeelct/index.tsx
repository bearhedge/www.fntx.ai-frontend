import { useState, ChangeEvent } from "react";

interface Iprops {
  type: string;
  value?: string | number;
  label: string | number;
  name?: string;
  className?: string;
  checked?:boolean
  disabled?:boolean
  id?:string
  handleChange?: (val: string, event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioCheckboxOption = ({
  type,
  value,
  label,
  name,
  disabled,
  checked,
  className,
  id,
  handleChange,
}: Iprops) => {
  // State for checkboxes (multiple selection)
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    (string | number)[]
  >([]);

  // State for radio buttons (single selection)
  // const [selectedRadio, setSelectedRadio] = useState<string>("");

  // Handle checkbox change
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (type === "checkbox") {
      if (checked) {
        setSelectedCheckboxes((prev) => [...prev, value]);
      } else {
        setSelectedCheckboxes((prev) =>
          prev.filter((item) => item !== value)
        );
      }
    } else {
      handleChange && handleChange(value, event);
    }
  };
  // console.log(disabled,label,'disabled==='); 
  
  return (
    <label
      htmlFor={id || name}
      className={`form-input-check d-flex align-items-center justify-content-center mb-3 
      ${disabled?'input-disabled':''}
      ${
        (value && selectedCheckboxes.includes(value)) || checked
          ? "active"
          : ""
      } ${className}`}
    >
      <input
        type={type}
        disabled={disabled}
        value={value}
        id={id || name}
        name={name}
        className="d-none"
        checked={
          type === "checkbox"
            ? value ? selectedCheckboxes.includes(value):false
            : checked
        }
        onChange={handleCheckboxChange}
      />
      {` ${label}`}
    </label>
  );
};

export default RadioCheckboxOption;
