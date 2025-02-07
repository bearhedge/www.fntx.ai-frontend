import RadioCheckboxOption from "../../RadioCheckbox";
import Card from "../../Card";
import Button from "../../form/button";
import CircularButton from "./../CircularButton";
import { useState, useEffect } from "react";
import DialogConfirm from "../../modal";
import Required from "../../form/required";
import { convertToIST } from "../../../common/utilits";
const time = [
  {
    label: '180-mins',
    value: 180
  },
  {
    label: '210-mins',
    value: 210
  },
  {
    label: '240-mins',
    value: 240
  },
  {
    label: '270-mins',
    value: 270
  },
  {
    label: '300-mins',
    value: 300
  },
  {
    label: '330-mins',
    value: 330
  },
]
interface Iprops {
  handleTabChange: () => void;
  errorMessage: string
  state: any;
  updatePlaceOrder: (val: boolean) => void
  handleTabPrevious: (value: number) => void;
  isLoading: boolean
  handleChangeTime: (value: number | null) => void;
}
export default function Timing({ handleTabChange, handleChangeTime, handleTabPrevious, updatePlaceOrder, isLoading, state, errorMessage }: Iprops) {
  const [countdown, setCountdown] = useState<number | null>(null); // 120 minutes in seconds
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null); 
  const [isOpen, setIsOpen] = useState<number | null>(null)
  const [placeOrder] = useState<boolean | null>(false)
  useEffect(() => {
    if (state?.timer?.timer_value) {
      const timerCountDown = +state?.timer?.timer_value * 60
      const currentTimer = new Date().getTime()
      const calculatedEndTime = new Date(currentTimer + (state?.timer?.timer_value * 60) * 1000); // Calculate end time
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => (prev ? prev - 1 : timerCountDown - 1));
      }, 1000);
      setEndTime(state?.timer?.end_time ? state?.timer?.end_time :calculatedEndTime?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })); // Set end time
      const timeInterval = setInterval(() => {
        setCurrentTime((prevTime) => new Date((prevTime?.getTime() || currentTimer) + 1000));
      }, 1000);
      // Cleanup on component unmount
      return () => {
        clearInterval(countdownInterval);
        clearInterval(timeInterval);
      };
    }
  }, [state]);
  useEffect(() => {
    if (countdown === 0) {
      updatePlaceOrder(true)
      // setPlaceOrder(true); // Set placeOrder to true when countdown ends
    }
  }, [countdown]);
  // Format time in HH:MM:SS
  const formatTime = (timeInMinutes: number | null): string => {
    if (!timeInMinutes) {
      return '0'
    }
    const hours = Math.floor(timeInMinutes / 60); // Convert total minutes to hours
    return `${hours.toString().padStart(2, "0")}`;
  };
  const handleClose = (val: number | null) => {
    setIsOpen(val)
  }

  return (
    <div className="system-form system-form-timing">
      <Card className="mb-4">
        <div className="row">
          <div className="col-12 mb-3 pb-1">
            <div className="switch d-flex align-items-center justify-content-end">
              <input type="checkbox" /> <span className="ms-3">IDE</span>
            </div>
          </div>
          {
            time?.map((items, key) => <div className="col-sm-6 col-12" key={key}>
              <RadioCheckboxOption
                type="radio"
                label={items.label}
                value={items.value}
                checked={items.value === +state.timer?.original_timer_value}
                disabled={state.timer?.original_timer_value ? items.value !== state.timer?.original_timer_value : false}
                id={`${items.value}`}
                handleChange={() => handleClose(items.value)}
                className="font-bold"
              />
            </div>)
          }
        </div>
      </Card>
      <Card>
        {/* <RangeSlider count={8} /> */}
        <div className="row justify-content-center align-items-center mt-5">
          <div className="col-sm-6 col-12">
            <div className="row">
              <div className="col-sm-6 col-12 mb-1">
                <div className="system-trade-card-btn d-flex align-items-center justify-content-center">{currentTime?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || 'N/A'}</div>
              </div>
              <div className="col-sm-6 col-12 mb-1">
                <div className="system-trade-card-btn d-flex align-items-center justify-content-center">{formatTime(countdown)} mins</div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-12 mb-1 mx-auto">
                <div className="system-trade-card-btn d-flex align-items-center justify-content-center">{convertToIST(endTime) || 'N/A'}</div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-12 d-flex justify-content-around">
            <CircularButton text={"P"} bgColor={state.timer?.place_order === 'P' ? 'green' : ''} />
            <CircularButton text={"N"} bgColor={state.timer?.place_order === 'N' ? 'green' : ''} />
            <CircularButton text={"D"} bgColor={(state.timer?.original_timer_value && placeOrder) || state.timer?.place_order === 'D' ? 'green' : ''} />
          </div>
        </div>
        <Required errorText={errorMessage} />
        <div className="d-flex align-items-cener justify-content-center mt-4">
          <Button
            className="btn btn-primary btn-next-step me-2"
            onClick={() => handleTabPrevious(0)}
          >
            Previous
          </Button>
          <Button
            className="btn btn-primary btn-next-step"
            onClick={handleTabChange}
            disabled={!state.timer?.original_timer_value || isLoading}
            isLoading={isLoading}
          >
            Next Step
          </Button>
        </div>

      </Card>
      <DialogConfirm isOpen={isOpen} title={'Are you sure?'} des={'Are you sure you want to set this time? This action cannot be undone.'} onClose={() => handleClose(null)}>
        <div className="d-flex align-items-center">
          <Button type='button' className="btn w-100 me-1" onClick={() => handleClose(0)}>Cancel</Button>
          <Button className="btn btn-primary w-100 me-2" onClick={() => { handleChangeTime(isOpen); handleClose(0) }}>Confirm</Button>
        </div>
      </DialogConfirm>
    </div>
  );
}