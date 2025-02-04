import { useEffect, useState } from "react";

interface RangeSliderProps {
  className?: string
  count: number,
  oddNumbers?: boolean
  handleChange?: (event:React.ChangeEvent<HTMLInputElement>, val: number) => void
  name?:string
  min?: number | null
  max?: number | null
  val?:any
}

const RangeSlider: React.FC<RangeSliderProps> = ({ className = '', handleChange,name, min, max, count, oddNumbers , val}) => {
  console.log(val, "value========")
  const [value, setValue] = useState<number>(val || 0);
    useEffect(()=>{
      if(val){
        setValue(val)
      }
    },[val])
  const handleChangeRange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleChange && handleChange(event, Number(event.target.value))
    setValue(Number(event.target.value));
  };

  return (
    <div className={`slider-container w-100 ${className}`}>
      <input
        type="range"
        min={min ? min : "0"}
        max={max ? max : "100"}
        name={name}
        value={value}
        onChange={handleChangeRange}
        className="range-slider w-100"
      />

      <div className="slider-markers">
        {Array.from({ length: count }).map((_, index) => (

          <div
            key={index}
            className={`marker`}
          >
            {oddNumbers ? index % 2 === 0 ? index : null : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RangeSlider;
