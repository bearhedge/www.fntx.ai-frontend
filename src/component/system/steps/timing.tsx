import { SystemPagesProps } from "../../../common/type";
import RadioCheckboxOption from "../../buttonSeelct";
import Card from "../../Card";
import Button from "../../form/button";
import CircularButton from "./../CircularButton";
import RangeSlider from "./../RangeSlider";

export default function Timing({ handleTabChange }: SystemPagesProps) {
  return (
    <div className="system-form">
      <Card className="mb-4">
        <div className="row">
          <div className="col-12 mb-3 pb-1">
            <div className="switch d-flex align-items-center justify-content-end">
              <input type="checkbox" /> <span className="ms-3">IDE</span>
            </div>
          </div>
          <div className="col-sm-6 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="90 min"
              value="90 min"
              id="90 min"
              className="font-bold"
            />
          </div>
          <div className="col-sm-6 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="120 min"
              value="120 min"
              id="120 min"
              className="font-bold"
            />
          </div>
          <div className="col-sm-6 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="150 min"
              value="150 min"
              id="150 min"
              className="font-bold"
            />
          </div>
          <div className="col-sm-6 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="180 min"
              value="180 min"
              id="180 min"
              className="font-bold"
            />
          </div>
          <div className="col-sm-6 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="210 min"
              value="210 min"
              id="210 min"
              className="font-bold"
            />
          </div>
          <div className="col-sm-6 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="240 min"
              value="240 min"
              id="240 min"
              className="font-bold"
            />
          </div>
        </div>
      </Card>
      <Card>
        <RangeSlider count={8}/>
        <div className="row justify-content-center mt-5">
          <div className="col-sm-6 col-12">
            <div className="row">
              <div className="col-sm-6 col-12 mb-1">
                <RadioCheckboxOption
                  type="checkbox"
                  label="11:52"
                  value="11:52"
                  id="11:52"
                />
              </div>
              <div className="col-sm-6 col-12 mb-1">
                <RadioCheckboxOption
                  type="checkbox"
                  label="120 mins"
                  value="120 mins"
                  id="120 mins"
                />
              </div>
              <div className="col-sm-6 col-12 mb-1">
                <RadioCheckboxOption
                  type="checkbox"
                  label="13:52"
                  value="13:52"
                  id="13:52"
                />
              </div>
              <div className="col-sm-6 col-12 mb-1">
                <RadioCheckboxOption
                  type="checkbox"
                  label="120 mins"
                  value="120 mins"
                  id="120 mins"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-12 d-flex justify-content-around">
            <CircularButton text={"P"} />
            <CircularButton text={"N"} />
            <CircularButton text={"D"} />
          </div>
        </div>
        <Button
          className="btn btn-primary btn-next-step mx-auto mt-4"
          onClick={handleTabChange}
        >
          Next Step
        </Button>
      </Card>
    </div>
  );
}
