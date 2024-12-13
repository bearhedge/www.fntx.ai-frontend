import { SystemPagesProps } from "../../../common/type";
import RadioCheckboxOption from "../../buttonSeelct";
import Card from "../../Card";
import Button from "../../form/button";
import StockTable from "../StockTable";

const callsSection = [
  ["-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-"],
  [121.36, "00", "0.00%", 10, 10],
  ["-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-"],
];

const putsSection = [
  [121.36, "00", "0.00", "-", 1],
  [121.36, "00", "0.00", "-", 10],
  [121.36, "00", "0.00", "-", 100],
  [121.36, "00", "0.00", "-", "-"],
  [121.36, "00", "0.00", "-", 10],
  [121.36, "00", "0.00", "-", 10],
  [121.36, "00", "0.00", "-", 10],
  [121.36, "00", "0.00", "-", 10],
  [121.36, "00", "0.00", "-", 10],
  
];

export default function Contracts({ handleTabChange }: SystemPagesProps) {
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
              label="Single Leg"
              value="Single Leg"
              id="Single Leg"
              className="font-bold"
            />
          </div>
          <div className="col-sm-6 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="Double Leg"
              value="Double Leg"
              id="Double Leg"
              className="font-bold"
            />
          </div>
          <div className="col-sm-6 col-12">
            <div className="row">
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="Call"
                  value="Call"
                  id="Call"
                  className="font-bold"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="checkbox"
                  label="Put"
                  value="Put"
                  id="Put"
                  className="font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <div className="row mb-3">
          <div className="col-sm-6 col-12">
            <StockTable title={"Calls"} rows={callsSection} showStrike={true} />
          </div>
          <div className="col-sm-6 col-12">
            <StockTable title={"Puts"} className="grey-bg" rows={putsSection} />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-sm-6 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="Call Contract"
              value="Call Contract"
              id="Call Contract"
              className="bg-white"
            />
          </div>
          <div className="col-sm-6 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="Put Contract"
              value="Put Contract"
              id="Put Contract"
              className="bg-white"
            />
          </div>
          <div className="col-sm-6 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="Last Price"
              value="Last Price"
              id="Last Price"
              className="bg-white"
            />
          </div>
          <div className="col-sm-6 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="Last Price"
              value="Last Price"
              id="Last Price"
              className="bg-white"
            />
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
