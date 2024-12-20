import { SystemPagesProps } from "../../../common/type";
import RadioCheckboxOption from "../../buttonSeelct";
import Card from "../../Card";
import Button from "../../form/button";
import InputCard from "./../InputCard";
const time = [
  '1-day',
  '4-hours',
  '1-hour',
  '30-mins',
  '15-mins',
  '5-mins',
]
interface Iprops {
  handleTabChange: () => void;
  state: any;
  isLoading: boolean
  handleChangeRange: (value: string | number, name: string) => void;
}
export default function Range({ handleTabChange, state, isLoading, handleChangeRange }: Iprops) {
  const handleGetTotal = (): string | number => {
    const val = state.time_frame?.split('-')
    let result = 'N/A'
    if (val?.length && state.time_steps) {
      result = `${+val[0] * state.time_steps} ${val[1]}`
    }
    return result
  }
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
              {
                time?.map((items, key) => <div key={key} className="col-sm-6 col-12">
                  <RadioCheckboxOption
                    type="radio"
                    label={items}
                    value={items}
                    id={items}
                    className="font-bold"
                    checked={state.time_frame === items}
                    handleChange={() => handleChangeRange(items, 'time_frame')}
                  />
                </div>)
              }
            </div>
          </Card>
        </div>
        <div className="col-sm-6 col-12 mb-4">
          <Card>
            <div className="row">
              <label className="fw-600 pb-1 mb-3">Timesteps</label>
              {
                [...new Array(12)]?.map((items: number, key: number) => <div key={key} className="col-sm-3 col-12">
                  <RadioCheckboxOption
                    type="radio"
                    label={key + 1}
                    value={key + 1}
                    id={'timesteps' + key}
                    className="font-bold"
                    checked={state.time_steps === (key + 1)}
                    handleChange={() => handleChangeRange((key + 1), 'time_steps')}
                  />
                </div>)
              }
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <div className="row">
          <div className="col-sm-6 col-12 mb-4">
            <div className="row">
              <div className="col-sm-6 col-12">
                <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Timeframe</div>
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label={state.time_frame.replace('-', ' ') || 'N/A'}
                  disabled
                  className="bg-white"
                />
              </div>
              <div className="col-sm-6 col-12">
                <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Timesteps</div>
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label={state.time_steps || 'N/A'}
                  disabled
                  id="2"
                  className="bg-white"
                />
              </div>
              <div className="col-sm-6 col-12">
                <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Total Time</div>
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label={handleGetTotal()}
                  value="2 days"
                  id="2 days"
                  disabled
                  className="bg-white"
                />
              </div>
              <div className="col-12">
                <Button
                  className="btn btn-primary btn-next-step w-100"
                  onClick={handleTabChange}
                  isLoading={isLoading}
                  disabled={!(state.time_frame && state.time_steps) || isLoading}
                >
                  Next Step
                </Button>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-12 mb-4">
            <InputCard
              text={
                " According to the previous 2 time steps under the 1-day timeframe, the upper bound is at __________ and the lower bound is at __________."
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
