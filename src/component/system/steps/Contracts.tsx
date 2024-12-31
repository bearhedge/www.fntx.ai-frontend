import * as React from "react";
import { useEffect, useRef, useState } from "react";
// import Fetch from "../../../common/api/fetch";
import RadioCheckboxOption from "../../buttonSeelct";
import Card from "../../Card";
import Button from "../../form/button";
import Required from "../../form/required";
import StockTable from "../StockTable";
interface Iprops {
  handleTabChange: () => void;
  state: any;
  errorMessage:string
  isLoading: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Contracts({ handleTabChange, onChange, state, isLoading, errorMessage }: Iprops) {
  const [contractType, setContractType] = useState('')
  const [order, setOrders] = useState<any>([]);
  const socketRef = useRef<any>()
  useEffect(() => {
    // Create the WebSocket connection
    const getSessionToken = async () => {
      try {
        const wsStrikes = new WebSocket(`${import.meta.env.VITE_API_SOCKET_URL}ws/strikes/`); // WebSocket URL must start with 'wss://'
        // When the WebSocket opens
        wsStrikes.onopen = () => {
          console.log('WebSocket Strikes connected');
          wsStrikes.send(JSON.stringify({ contract_id: state.ticker_data?.conid }));
        }
        wsStrikes.onmessage = (event:any) => {
          setOrders(JSON.parse(event.data)?.option_chain_data)
        }
        // When the WebSocket encounters an error
        wsStrikes.onerror = (error) => {
          console.log('WebSocket error:', error);
        };

        // When the WebSocket closes
        wsStrikes.onclose = () => {
          console.log('WebSocket connection closed');
        };

        // Store the WebSocket connection in state
        socketRef.current = wsStrikes
        // })

      } catch (error) {
        console.error('Error fetching session token:', error);
      }
    };
    if (state.ticker_data?.conid) {
      getSessionToken();
    }
    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [state.ticker_data]);

  const columnsCall: readonly any[] = [
    { id: "call", label: "Last Price", formatHtmls: (item: any) => item?.call?.live_data[0][31]?.replace('C','')|| '-'},
    { id: "call", label: "Change",formatHtmls: (item: any) => item?.call?.live_data[0][82] || '-'},
    { id: "call", label: "%Change",formatHtmls: (item: any) => item?.call?.live_data[0][83] || '-'},
    { id: "call", label: "Volume",formatHtmls: (item: any) => item?.call?.live_data[0][7086] || '-'},
    { id: "call", label: "Open Interest",formatHtmls: (item: any) => item?.call?.live_data[0][7085]  || '-'},
  ];
  const columnsPut: readonly any[] = [
    { id: "put", label: "Last Price", formatHtmls: (item: any) => item?.put?.live_data[0][31]?.replace('C','') || '-'},
    { id: "put", label: "Change",formatHtmls: (item: any) => item?.put?.live_data[0][82] || '-'},
    { id: "put", label: "%Change",formatHtmls: (item: any) => item?.put?.live_data[0][83] || '-'},
    { id: "put", label: "Volume",formatHtmls: (item: any) => item?.put?.live_data[0][7086] || '-'},
    { id: "put", label: "Open Interest",formatHtmls: (item: any) => item?.put?.live_data[0][7085]  || '-'},

  ];
  const columnsStrikes: readonly any[] = [
    { id: "strike", label: "Strikes"},
    // { id: "billable_time_spend", label: "Open Interest" },
  ];
    console.log(order, 'message===');

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
              label="Single Leg"
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
              label="Double Leg"
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
      <Card className="system-form-orders">
        <div className="row mb-3">
          {(state.contract_type === 'call' || state.contract_type === 'both') && <div className={`col-sm-${state.contract_type === 'both' ? 5 : 9} col-12`}>
            <StockTable title={"Calls"} rows={order} columns={columnsCall} showStrike={true} />
          </div>}
          {state.contract_type && <div className={`col-sm-${state.contract_type === 'both' ? 2 : 3} col-12 strike-table`}>
            <StockTable title={""} rows={order} columns={columnsStrikes} showStrike={true} />
          </div>}
          {(state.contract_type === 'put' || state.contract_type === 'both') && <div className={`col-sm-${state.contract_type === 'both' ? 5 : 12} col-12`}>
            <StockTable title={"Puts"} className="grey-bg" columns={columnsPut} rows={order} />
          </div>}
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
        <Required errorText={errorMessage}/> 
        <Button
          className="btn btn-primary btn-next-step mx-auto mt-4"
          onClick={handleTabChange}
          isLoading={isLoading}
          disabled={!state.contract_type}
        >
          Next Step
        </Button>
      </Card>
    </div>
  );
}
