import { useState } from "react";

interface RangeSliderProps {
  className?: string
  count:number,
  oddNumbers?:boolean
}

const RangeSlider: React.FC<RangeSliderProps> = ({ className = '', count,oddNumbers}) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(Number(event.target.value));
  };

  return (
    <div className={`slider-container w-100 ${className}`}>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="range-slider w-100"
      />

      <div className="slider-markers">
        {Array.from({ length: count }).map((_, index) => (

          <div
            key={index}
            className={`marker`}
          >
            {oddNumbers? index % 2 === 0 ? index : null : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RangeSlider;
