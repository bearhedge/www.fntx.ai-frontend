import { useState } from "react";
import {
  ConidsProps,
  InstrumentsProps,
  // sectionsProps,
  TickerList,
} from "../../../common/type";
import RadioCheckboxOption from "../../RadioCheckbox";
import Card from "../../Card";
import Button from "../../form/button";
// import Input from "../../form/input";
import Loader from "../../form/loader";
import Required from "../../form/required";
import MultiCodeEvaluator from "../../ide";
interface Iprops {
  handleTabChange: () => void;
  list: TickerList | any;
  state: any;
  conIds: ConidsProps[];
  errorMessage: string
  isLoading: boolean
  isLoadingConid: boolean
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeTicker: (value: InstrumentsProps | null) => void;
}
export default function Ticker({
  handleTabChange,
  list,
  // conIds,
  state,
  isLoading,
  isLoadingConid,
  errorMessage,
  // onChange,
  onChangeTicker,
}: Iprops) {
  const [isIde] = useState(false)
  // const [isIde,setIsIde] = useState(true)
  const [instrumentsOpt, setInstrumentsOpt] = useState<string>("");
  const handleChange = (val: string) => {
    setInstrumentsOpt(val);
    onChangeTicker(null)
  };
  const ins = Object.keys(list)
  if (!ins?.length) {
    return <>No Ticker Avaibale</>
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
            !isIde ?
              ins?.map((items: string, key: number) => <div className="col-sm-4 col-12" key={key}>
                <RadioCheckboxOption
                  type="radio"
                  label={items}
                  value={items}
                  disabled={isLoadingConid}
                  id={items}
                  className="font-bold"
                  checked={(instrumentsOpt || state.ticker_data?.instruments_opt) === items}
                  handleChange={handleChange}
                />
              </div>)
              :
              <MultiCodeEvaluator />
          }
        </div>
      </Card>
      <Card>
        <div className="row justify-content-center">
          {list[instrumentsOpt || state.ticker_data?.instruments_opt]?.map((item: InstrumentsProps) => (
            <div className="col-sm-3 col-12 mb-1" key={item.id}>
              <RadioCheckboxOption
                type="radio"
                label={item.instrument}
                disabled={isLoadingConid}
                checked={state.instrument === item.id}
                value={item.id}
                name="instrument"
                id={item.instrument.replace(/ /g, "")}
                handleChange={() => onChangeTicker(item)}
              />
            </div>
          ))}
        </div>
        {
          isLoadingConid ? <Loader dark={true} /> : null
        }
        {/* {conIds?.length ? (
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Input
                type="select"
                label="Symbol Connections"
                name="ticker_data"
                onChange={onChange}
                value={JSON.stringify(state.ticker_data)}
              >
                <option disabled selected value={state.ticker_data ? JSON.stringify({ instruments_opt: state.ticker_data.instruments_opt }) : "{}"}>
                  Select
                </option>
                {conIds?.map((items: ConidsProps) => (
                  <option key={items.conid} value={JSON.stringify({ ...items, instruments_opt: state.ticker_data.instruments_opt ? state.ticker_data.instruments_opt : instrumentsOpt })}>
                    {items.companyHeader}
                  </option>
                ))}
              </Input>
            </div>
            <div className="col-md-6">
              <ul className="system-form-conId">
                {
                  state?.ticker_data?.sections?.map((items: sectionsProps, key: number) => <li key={key}>
                    <p><strong>Type: </strong> {items.secType}</p>
                    {items.months && <p><strong>Months: </strong> {items.months?.split(';').join(', ')}</p>}
                    {items.exchange && <p><strong>Exchange: </strong> {items.exchange?.split(';').join(', ')}</p>}
                  </li>)
                }
              </ul>
            </div>
          </div>
        ) : null} */}
        <Required errorText={errorMessage}  />
        <Button
          disabled={!(state.instrument && state.ticker_data?.symbol) || isLoading}
          isLoading={isLoading}
          className="btn btn-primary btn-next-step mx-auto mt-4"
          onClick={handleTabChange}
        >
          Next Step
        </Button>
      </Card>
    </div>
  );
}
