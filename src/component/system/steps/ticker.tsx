import { useState } from "react";
import {
  ConidsProps,
  InstrumentsProps,
  TickerList,
} from "../../../common/type";
import RadioCheckboxOption from "../../buttonSeelct";
import Card from "../../Card";
import Button from "../../form/button";
import Input from "../../form/input";
interface Iprops {
  handleTabChange: () => void;
  list: TickerList | any;
  instrument: string;
  conIds: ConidsProps[];
  onChange: (value: InstrumentsProps) => void;
}
export default function Ticker({
  handleTabChange,
  list,
  conIds,
  instrument,
  onChange,
}: Iprops) {
  const [instrumentsOpt, setInstrumentsOpt] = useState<string>("");
  const handleChange = (val: string) => {
    setInstrumentsOpt(val);
  };
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
              type="radio"
              label="Equity"
              value="EQUITY"
              name="equity"
              className="font-bold"
              checked={instrumentsOpt === "EQUITY"}
              handleChange={handleChange}
            />
          </div>
          <div className="col-sm-4 col-12">
            <RadioCheckboxOption
              type="radio"
              label="Commodity"
              value="COMMODITY"
              checked={instrumentsOpt === "COMMODITY"}
              name="commodity"
              className="font-bold"
              handleChange={handleChange}
            />
          </div>
          <div className="col-sm-4 col-12">
            <RadioCheckboxOption
              type="radio"
              checked={instrumentsOpt === "CRYPTO"}
              label="Crypto"
              value="CRYPTO"
              name="crypto"
              handleChange={handleChange}
              className="font-bold"
            />
          </div>
        </div>
      </Card>
      <Card>
        <div className="row justify-content-center">
          {list[instrumentsOpt]?.map((item: InstrumentsProps) => (
            <div className="col-sm-3 col-12 mb-1" key={item.id}>
              <RadioCheckboxOption
                type="radio"
                label={item.instrument}
                checked={instrument === item.id}
                value={item.id}
                name="instrument"
                id={item.instrument.replace(/ /g, "")}
                handleChange={() => onChange(item)}
              />
            </div>
          ))}
        </div>
        {conIds?.length ? (
          <div className="row justify-content-center">
            <Input
              type="select"
              label="Symbol Connections"
              name="instrument_data"
            >
              <option disabled selected value="">
                Select
              </option>
              {conIds?.map((items: ConidsProps) => (
                <option key={items.conid} value={JSON.stringify(items)}>
                  {items.companyHeader}
                </option>
              ))}
            </Input>
          </div>
        ) : null}
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
