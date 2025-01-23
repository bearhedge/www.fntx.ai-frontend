import * as React from "react";
import { useEffect, useState } from "react";
// import Fetch from "../../../common/api/fetch";
import RadioCheckboxOption from "../../RadioCheckbox";
import Card from "../../Card";
import Button from "../../form/button";
import Required from "../../form/required";
import StockTable from "../StockTable";
interface Iprops {
  handleTabChange: () => void;
  state: any;
  handleTabPrevious: (value: number) => void;
  errorMessage: string
  handleSelectedOrder: (item: any, type: string) => void
  selectedOrder: any
  order: any
  isLoading: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Contracts({ handleTabChange, onChange, order, selectedOrder, state, handleTabPrevious, handleSelectedOrder, isLoading, errorMessage }: Iprops) {
  const [contractType, setContractType] = useState('')
  useEffect(() => {
    if (state.contract_type === 'call' || state.contract_type === 'put') {
      setContractType('Single Leg')
    }
  }, [state.contract_type])
  const columnsCall: readonly any[] = [
    { id: "call", label: "Last Price", formatHtmls: (item: any) => item?.call?.live_data?.length && item?.call?.live_data[0][31]?.replace('C', '') || '-' },
    { id: "call", label: "Change", formatHtmls: (item: any) => item?.call?.live_data?.length && item?.call?.live_data[0][82] || '-' },
    { id: "call", label: "%Change", formatHtmls: (item: any) => item?.call?.live_data?.length && item?.call?.live_data[0][83] || '-' },
    { id: "call", label: "Volume", formatHtmls: (item: any) => item?.call?.live_data?.length && item?.call?.live_data[0][87] || '-' },
    { id: "call", label: "Open Interest", formatHtmls: (item: any) => item?.call?.live_data?.length && item?.call?.live_data[0][7638] || '-' },
  ];
  const columnsPut: readonly any[] = [
    { id: "put", label: "Last Price", formatHtmls: (item: any) => item?.put?.live_data?.length && item?.put?.live_data[0][31]?.replace('C', '') || '-' },
    { id: "put", label: "Change", formatHtmls: (item: any) => item?.put?.live_data?.length && item?.put?.live_data[0][82] || '-' },
    { id: "put", label: "%Change", formatHtmls: (item: any) => item?.put?.live_data?.length && item?.put?.live_data[0][83] || '-' },
    { id: "put", label: "Volume", formatHtmls: (item: any) => item?.put?.live_data?.length && item?.put?.live_data[0][87] || '-' },
    { id: "put", label: "Open Interest", formatHtmls: (item: any) => item?.put?.live_data?.length && item?.put?.live_data[0][7638] || '-' },

  ];
  const columnsStrikes: readonly any[] = [
    { id: "strike", label: "Strikes" },
    // { id: "billable_time_spend", label: "Open Interest" },
  ];
  
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
              type="radio"
              checked={contractType === 'Single Leg'}
              label="Single-leg"
              value=""
              name="contract_type"
              id="SingleLeg"
              handleChange={(_, e: React.ChangeEvent<HTMLInputElement>) => { setContractType('Single Leg'); onChange(e) }}
              className="font-bold"
            />
          </div>
          <div className="col-sm-6 col-12">
            <RadioCheckboxOption
              type="radio"
              label="Double-leg"
              checked={state.contract_type === 'both'}
              value="both"
              id="DoubleLeg"
              name="contract_type"
              handleChange={(_: string, e: React.ChangeEvent<HTMLInputElement>) => { onChange(e); setContractType('') }}
              className="font-bold"
            />
          </div>
          {contractType === 'Single Leg' && <div className="col-sm-6 col-12">
            <div className="row">
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="radio"
                  checked={state.contract_type === 'call'}
                  name="contract_type"
                  label="Call"
                  value="call"
                  id="Call"
                  handleChange={(_: string, e: React.ChangeEvent<HTMLInputElement>) => { onChange(e) }}
                  className="font-bold"
                />
              </div>
              <div className="col-sm-6 col-12">
                <RadioCheckboxOption
                  type="radio"
                  name="contract_type"
                  label="Put"
                  checked={state.contract_type === 'put'}
                  handleChange={(_: string, e: React.ChangeEvent<HTMLInputElement>) => { onChange(e) }}
                  value="put"
                  id="Put"
                  className="font-bold"
                />
              </div>
            </div>
          </div>}
        </div>
      </Card>
      <Card>
        {state.contract_type && <> <div className="row mb-3 system-form-orders">
          {(state.contract_type === 'call' || state.contract_type === 'both') && <div className={`col-sm-${state.contract_type === 'both' ? 5 : 9} col-12`}>
            <StockTable selected={selectedOrder.call.selected} handleSelected={(row: any) => handleSelectedOrder({ ...row.call, selected: row.selected }, 'call')} title={state.contract_type === 'both' ? "Calls":''} rows={state.contract_type === 'both' ? order: order.filter((item:any)=> item.call)} columns={columnsCall} />
          </div>}
          <div className={`col-sm-${state.contract_type === 'both' ? 2 : 3} ${state.contract_type === 'put' && 'order-1'} col-12 ${state.contract_type === 'both' ? 'strike-table':''}`}>
            <StockTable title={""} rows={state.contract_type === 'both' ? order: state.contract_type === 'call' ? order.filter((item:any)=> item.call):state.contract_type === 'put' ? order.filter((item:any)=> item.put):[]} columns={columnsStrikes} showStrike={true} />
          </div>
          {(state.contract_type === 'put' || state.contract_type === 'both') && <div className={`col-sm-${state.contract_type === 'both' ? 5 : 9} col-12`}>
            <StockTable selected={selectedOrder.put.selected} handleSelected={(row: any) => handleSelectedOrder({ ...row.put, selected: row.selected }, 'put')} title={state.contract_type === 'both' ? "Puts":''} className="grey-bg" columns={columnsPut} rows={state.contract_type === 'both' ? order: order.filter((item:any)=> item.put)} />
          </div>}
        </div>

          <div className="row mt-4">
            {(state.contract_type === 'call' || state.contract_type === 'both') && selectedOrder?.call && <div className="col-sm-6 col-12">
              <RadioCheckboxOption
                type="checkbox"
                label={selectedOrder.call?.desc2}
                value="Call Contract"
                id="Call Contract"
                disabled
                className="bg-white"
              />
              <RadioCheckboxOption
                type="checkbox"
                label={`${selectedOrder?.call?.live_data?.length && selectedOrder?.call?.live_data[0][31]?.replace('C', '')}`}
                value="Last Price"
                disabled
                id="Last Price"
                className="bg-white"
              />
            </div>}
            {(state.contract_type === 'put' || state.contract_type === 'both') && selectedOrder?.put && <div className="col-sm-6 col-12">
              <RadioCheckboxOption
                type="checkbox"
                label={selectedOrder.put?.desc2}
                value="Put Contract"
                id="Put Contract"
                disabled
                className="bg-white"
              />
              <RadioCheckboxOption
                type="checkbox"
                label={`${selectedOrder?.put?.live_data?.length && selectedOrder?.put?.live_data[0][31]?.replace('C', '')}`}
                value="Last Price"
                disabled
                id="Last Price"
                className="bg-white"
              />
            </div>}
          </div>
        </>
        }
        <Required errorText={errorMessage} />
        <div className="d-flex align-items-cener justify-content-center mt-4">
          <Button
            className="btn btn-primary btn-next-step me-2"
            onClick={() => handleTabPrevious(3)}
          >
            Previous
          </Button>
          <Button
            className="btn btn-primary btn-next-step"
            onClick={handleTabChange}
            isLoading={isLoading}
            disabled={!(state.contract_type && (selectedOrder?.call || selectedOrder?.put))}
          >
            Next Step
          </Button>
        </div>
      </Card>
    </div>
  );
}
