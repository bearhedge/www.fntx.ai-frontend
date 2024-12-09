import { useState } from "react";

interface RangeSliderProps {}

const RangeSlider: React.FC<RangeSliderProps> = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(Number(event.target.value));
  };

  const markerPosition = (value / 100) * 7;

  return (
    <div className="slider-container w-100">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="range-slider w-100"
      />

      <div className="slider-markers">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={`marker ${index <= markerPosition ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RangeSlider;
