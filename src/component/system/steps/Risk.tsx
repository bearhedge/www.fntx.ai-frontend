import RadioCheckboxOption from "../../RadioCheckbox";
import Card from "../../Card";
import Button from "../../form/button";
import Required from "../../form/required";
import InputCard from "./../InputCard";
const confidenceLevel = [
  25,
  50,
  75,
  100,
]
interface Iprops {
  handleTabChange: () => void;
  state: any;
  isLoading: boolean
  handleTabPrevious: (value: number) => void;
  errorMessage: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Risk({ handleTabChange, isLoading, handleTabPrevious, state, onChange, errorMessage }: Iprops) {
  return (
    <div className="system-form">
      <div className="row">
        <div className="col-12 mb-4">
          <Card>
            <div className="row">
              <div className="col-12 mb-3 pb-1 d-flex justify-content-between">
                <label className="fw-600">Confidence Level</label>
              </div>
              {
                confidenceLevel?.map(item => <div className="col-sm-3 col-12">
                  <RadioCheckboxOption
                    type="radio"
                    checked={+state.confidence_level === item}
                    label={`${item}%`}
                    value={item}
                    id={item + 'level'}
                    name='confidence_level'
                    className="font-bold"
                    handleChange={(_: string, event: React.ChangeEvent<HTMLInputElement>) => onChange(event)}
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
                <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Confidence Level</div>
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label={state.confidence_level ? `${state.confidence_level}%` : 'N/A'}
                  disabled
                  className="bg-white"
                />
              </div>
              <div className="col-12">
                <Required errorText={errorMessage} />
                <div className="d-flex align-items-cener justify-content-center">
                  <Button
                    className="btn btn-primary btn-next-step me-2"
                    onClick={() => handleTabPrevious(2)}
                  >
                    Previous
                  </Button>
                  <Button
                    className="btn btn-primary btn-next-step w-100"
                    isLoading={isLoading}
                    disabled={!state.confidence_level || isLoading}
                    onClick={handleTabChange}
                  >
                    Next Step
                  </Button>
                </div>
              </div>

              {/* <label className="fw-600 note mt-2">
                Note:{" "}
                <span className="fw-normal">
                  The maximum number of contracts to be sold the SPY asset Would
                  be thirty contracts
                </span>
              </label> */}
            </div>
          </div>
          <div className="col-sm-6 col-12 mb-4">
            <InputCard
              text={
                "Selecting a 60% confidence level indicates, that for a cash position of HKD 100,000.00, the estimated exposure will be 18 contracts."
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
