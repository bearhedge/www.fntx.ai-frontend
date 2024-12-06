import RadioCheckboxOption from "../buttonSeelct";
import Card from "../Card";
import Button from "../form/button";
import Input from "../form/input";

export default function Risk() {
  return (
    <div className="system-form">
      <div className="row">
        <div className="col-12 mb-4">
          <Card>
            <div className="row">
              <div className="col-12 mb-3 pb-1 d-flex justify-content-between">
                <label className="fw-600">Confidence Level</label>
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="25%"
                  value="25%"
                  id="25%"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="50%"
                  value="50%"
                  id="50%"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="75%"
                  value="75%"
                  id="75%"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-3 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="100%"
                  value="100%"
                  id="100%"
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
                  label="Confidence Level"
                  value="Confidence Level"
                  id="Confidence Level"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="75%"
                  value="75%"
                  id="75%"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="Number of Contracts"
                  value="Number of Contracts"
                  id="Number of Contracts"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="23"
                  value="23"
                  id="23"
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
                    Selecting a 60% confidence level indicates, that for a cash
                    position of HKD 100,000.00, the estimated exposure will be
                    18 contracts.
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
