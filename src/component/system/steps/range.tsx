import RadioCheckboxOption from "../../RadioCheckbox";
import Card from "../../Card";
import Button from "../../form/button";
import Required from "../../form/required";
import InputCard from "./../InputCard";
const time = [
  '1-day',
  '4-hours',
  '1-hour',
  '30-mins',
  '15-mins',
  '5-mins',
]
interface BoundProps {
  lower_bound: number | null,
  upper_bound: number | null,
}
interface Iprops {
  handleTabChange: () => void;
  state: any;
  isLoading: boolean
  isLoadingRange:boolean
  handleTabPrevious: (value: number) => void;
  errorMessage: string
  bound: BoundProps
  handleChangeRange: (value: string | number, name: string) => void;
}
export default function Range({ handleTabChange,isLoadingRange, state, isLoading, handleChangeRange, handleTabPrevious, errorMessage, bound }: Iprops) {
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
                    disabled={isLoadingRange}
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
                [...new Array(10)]?.map((items: number, index: number) => {
                  const key = index + 2; // Start from 3
                return <div key={key} className="col-sm-3 col-12">
                  <RadioCheckboxOption
                    type="radio"
                    label={key + 1}
                    value={key + 1}
                    disabled={isLoadingRange}
                    id={'timesteps' + key + items}
                    className="font-bold"
                    checked={state.time_steps === (key + 1)}
                    handleChange={() => handleChangeRange((key + 1), 'time_steps')}
                  />
                </div>})
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
                  label={state.time_frame?.replace('-', ' ') || 'N/A'}
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
                <Required errorText={errorMessage} />
                <div className="d-flex align-items-cener justify-content-center mt-4">
                  <Button
                    className="btn btn-primary btn-next-step me-2"
                    onClick={() => handleTabPrevious(1)}
                  >
                    Previous
                  </Button>
                  <Button
                    className="btn btn-primary btn-next-step w-100"
                    onClick={handleTabChange}
                    isLoading={isLoading}
                    disabled={!(state.time_frame && state.time_steps) || isLoading || isLoadingRange}
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-12 mb-4">
            <InputCard
              text={
                `According to the previous 2 time steps under the 1-day timeframe, the upper bound is at ${bound.upper_bound || '_________'} and the lower bound is at ${bound.lower_bound || '_________'}.`
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
