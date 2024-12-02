import { useState, ChangeEvent } from "react";

interface Iprops {
    type: string;
    value: string | number;
    label: string;
    id: string
    handleChange: (val: string | number) => void
}

const SelectionComponent = ({ type, value, label, id, handleChange }: Iprops) => {
    // State for checkboxes (multiple selection)
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<(string | number)[]>([]);

    // State for radio buttons (single selection)
    const [selectedRadio, setSelectedRadio] = useState<string | number>("");

    // Handle checkbox change
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const parsedValue = isNaN(Number(value)) ? value : Number(value);
        if (type === "checkbox") {
            if (checked) {
                setSelectedCheckboxes((prev) => [...prev, parsedValue]);
            } else {
                setSelectedCheckboxes((prev) => prev.filter((item) => item !== parsedValue));
            }
        } else {
            setSelectedRadio(parsedValue);
            handleChange(parsedValue)
        }
    };

    return (
        <label htmlFor={id}>
            <input
                type={type}
                value={value}
                id={id}
                checked={type === "checkbox" ? selectedCheckboxes.includes(value) : selectedRadio === value}
                onChange={handleCheckboxChange}
            />
            {` ${label}`}
        </label>
    );
};

export default SelectionComponent;
