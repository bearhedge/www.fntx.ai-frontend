import RadioCheckboxOption from "../buttonSeelct";
import Card from "../Card";
import Button from "../form/button";
import Input from "../form/input";

export default function Range() {
  return (
    <div className="system-form">
      <div className="row">
        <div className="col-sm-6 col-12 mb-4">
          <Card>
            <div className="row">
              <div className="col-12 mb-3 pb-1 d-flex justify-content-between">
                <label className="fw-600">Timeframe</label>
                <div className="switch d-flex align-items-center justify-content-end">
                  <input type="checkbox" /> <span className="ms-3">IDE</span>
                </div>
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="1-day"
                  value="1-day"
                  id="1-day"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="4-hours"
                  value="4-hours"
                  id="4-hours"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="1-hour"
                  value="1-hour"
                  id="1-hour"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="30-mins"
                  value="30-mins"
                  id="30-mins"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="15-mins"
                  value="15-mins"
                  id="15-mins"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="5-mins"
                  value="5-mins"
                  id="5-mins"
                  className="font-bold"
                />
              </div>
            </div>
          </Card>
        </div>
        <div className="col-sm-6 col-12 mb-4">
          <Card>
            <div className="row">
              <label className="fw-600 pb-1 mb-3">Timesteps</label>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="1"
                  value="1"
                  id="1"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="2"
                  value="2"
                  id="2"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="3"
                  value="3"
                  id="3"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="4"
                  value="4"
                  id="4"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="5"
                  value="5"
                  id="5"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="6"
                  value="6"
                  id="6"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="7"
                  value="7"
                  id="7"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="8"
                  value="8"
                  id="8"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="9"
                  value="9"
                  id="9"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="10"
                  value="10"
                  id="10"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="11"
                  value="11"
                  id="11"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="12"
                  value="12"
                  id="12"
                  className="font-bold"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <div className="row">
          <div className="col-sm-6 col-12 mb-4">
            <div className="row">
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="Timeframe"
                  value="Timeframe"
                  id="Timeframe"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="1 Day"
                  value="1 Day"
                  id="1 Day"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="Timesteps"
                  value="Timesteps"
                  id="Timesteps"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="2"
                  value="2"
                  id="2"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="Total Time"
                  value="Total Time"
                  id="Total Time"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="2 days"
                  value="2 days"
                  id="2 days"
                />
              </div>
              <div className="col-12">
                <Button className="btn btn-primary btn-next-step w-100">
                  Next Step
                </Button>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-12 mb-4">
            <Card className="h-100">
              <div className="flex-grow-1">
                <div className="col-sm-3 col-6"></div>
                <div className="col-sm-9 col-6">
                  <label htmlFor="">
                    According to the previous 2 time steps under the 1-day
                    timeframe, the upper bound is at __________ and the lower
                    bound is at __________.
                  </label>
                </div>
              </div>
              <Input placeholder="Type your question here..." />
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
