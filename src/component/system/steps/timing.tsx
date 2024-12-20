import { SystemPagesProps } from "../../../common/type";
import RadioCheckboxOption from "../../buttonSeelct";
import Card from "../../Card";
import Button from "../../form/button";
import CircularButton from "./../CircularButton";
import RangeSlider from "./../RangeSlider";
import { useState, useEffect } from "react";
import DialogConfirm from "../../modal";

const time = [
  {
    label: '90 min',
    value: '90'
  },
  {
    label: '120 min',
    value: '120'
  },
  {
    label: '150 min',
    value: '150'
  },
  {
    label: '180 min',
    value: '180'
  },
  {
    label: '210 min',
    value: '210'
  },
  {
    label: '240 min',
    value: '240'
  },
]
interface Iprops {
  handleTabChange: () => void;
  state: any;
  isLoading: boolean
  handleChangeTime: (value: string) => void;
}
export default function Timing({ handleTabChange, handleChangeTime, isLoading, state }: Iprops) {
  const [countdown, setCountdown] = useState<number | null>(null); // 120 minutes in seconds
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState('')
  useEffect(() => {
    if (state?.timer?.timer_value) {
      const timerCountDown = +state?.timer?.timer_value * 60
      const currentTimer = new Date().getTime()
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => (prev ? prev - 1 : timerCountDown - 1));
      }, 1000);

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

  // Format time in HH:MM:SS
  const formatTime = (timeInMinutes: number | null): string => {
    if (!timeInMinutes) {
      return '0'
    }
    const hours = Math.floor(timeInMinutes / 60); // Convert total minutes to hours
    return `${hours.toString().padStart(2, "0")}`;
  };
  const handleClose = (val = '') => {
    setIsOpen(val)
  }
  return (
    <div className="system-form">
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
                checked={items.value === state.timer?.original_timer_value}
                disabled={state.timer?.original_timer_value ? items.value !== state.timer?.original_timer_value : false}
                id={items.value}
                handleChange={() => handleClose(items.value)}
                className="font-bold"
              />
            </div>)
          }
        </div>
      </Card>
      <Card>
        {/* <RangeSlider count={8} /> */}
        <div className="row justify-content-center mt-5">
          <div className="col-sm-6 col-12">
            <div className="row">
              <div className="col-sm-6 col-12 mb-1">
                <div className="system-trade-card-btn d-flex align-items-center justify-content-center">{currentTime?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || 'N/A'}</div>
              </div>
              <div className="col-sm-6 col-12 mb-1">
                <div className="system-trade-card-btn d-flex align-items-center justify-content-center">{formatTime(countdown)} mins</div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-12 d-flex justify-content-around">
            <CircularButton text={"P"} bgColor={state.timer?.place_order === null ? 'green' : ''} />
            <CircularButton text={"N"} bgColor={state.timer?.place_order === false ? 'green' : ''} />
            <CircularButton text={"D"} bgColor={state.timer?.place_order === true ? 'green' : ''} />
          </div>
        </div>
        <Button
          className="btn btn-primary btn-next-step mx-auto mt-4"
          onClick={handleTabChange}
          disabled={!state.timer?.original_timer_value || isLoading}
          isLoading={isLoading}
        >
          Next Step
        </Button>
      </Card>
      <DialogConfirm isOpen={isOpen} title={'Are you sure?'} des={'Are you sure you want to set this time? This action cannot be undone.'} onClose={handleClose}>
        <div className="d-flex align-items-center">
          <Button type='button' className="btn w-100 me-1" onClick={() => handleClose()}>Cancel</Button>
          <Button className="btn btn-primary w-100 me-2" onClick={() => { handleChangeTime(isOpen); handleClose() }}>Confirm</Button>
        </div>
      </DialogConfirm>
    </div>
  );
}