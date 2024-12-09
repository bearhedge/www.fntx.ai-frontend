import { SystemPagesProps } from "../../common/type";
import RadioCheckboxOption from "../buttonSeelct";
import Card from "../Card";
import Button from "../form/button";

export default function Ticker({ handleTabChange }: SystemPagesProps) {
  return (
    <div className="system-form">
      <Card className="mb-4">
        <div className="row">
          <div className="col-12 mb-3 pb-1">
            <div className="switch d-flex align-items-center justify-content-end">
              <input type="checkbox" /> <span className="ms-3">IDE</span>
            </div>
          </div>
          <div className="col-sm-4 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="Equity"
              value="equity"
              id="equity"
              className="font-bold"
            />
          </div>
          <div className="col-sm-4 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="Commodity"
              value="commodity"
              id="commodity"
              className="font-bold"
            />
          </div>
          <div className="col-sm-4 col-12">
            <RadioCheckboxOption
              type="checkbox"
              label="Crypto"
              value="crypto"
              id="crypto"
              className="font-bold"
            />
          </div>
        </div>
      </Card>
      <Card>
        <div className="row justify-content-center">
          <div className="col-sm-3 col-12 mb-1">
            <RadioCheckboxOption
              type="checkbox"
              label="SPY"
              value="SPY"
              id="SPY"
            />
          </div>
          <div className="col-sm-3 col-12 mb-1">
            <RadioCheckboxOption
              type="checkbox"
              label="QQQ"
              value="QQQ"
              id="QQQ"
            />
          </div>
          <div className="col-sm-3 col-12 mb-1">
            <RadioCheckboxOption
              type="checkbox"
              label="IWM"
              value="IWM"
              id="IWM"
            />
          </div>
          <div className="col-sm-3 col-12 mb-1">
            <RadioCheckboxOption
              type="checkbox"
              label="GLD"
              value="GLD"
              id="GLD"
            />
          </div>
          <div className="col-sm-3 col-12 mb-1">
            <RadioCheckboxOption
              type="checkbox"
              label="IBIT"
              value="IBIT"
              id="IBIT"
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
