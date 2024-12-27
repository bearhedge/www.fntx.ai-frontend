import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Fetch from "../../../common/api/fetch";
import RadioCheckboxOption from "../../buttonSeelct";
import Card from "../../Card";
import Button from "../../form/button";
import StockTable from "../StockTable";
interface Iprops {
  handleTabChange: () => void;
  state: any;
  isLoading: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Contracts({ handleTabChange, onChange, state, isLoading }: Iprops) {
  const [contractType, setContractType] = useState('')
  const [message, setMessage] = useState<any>([]);
  const [strikes, setStrikes] = useState<any>([]);
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
        wsStrikes.onmessage = (event) => {
          setStrikes(JSON.parse(event.data)?.valid_strikes)
        }
        Fetch('ibkr/get-token').then(res => {
          const token = res.data;
          const ws = new WebSocket('wss://localhost:8000/v1/api/ws'); // WebSocket URL must start with 'wss://'

          ws.onopen = () => {
            console.log('WebSocket connected');
            // ws.send(JSON.stringify({ session: '9662a788374c67e313b6710f3e0a9599' }));
            ws.send(JSON.stringify({ cookie: `api=${'{"session":"9662a788374c67e313b6710f3e0a9599"}'}` }));
            ws.send('smd+' + state.ticker_data?.conid + '+' + JSON.stringify({ fields: ["31", "82", "83", "7089", "201", "7635",'7086','7085'] }));
          };

          // When a message is received from the server
          ws.onmessage = (event) => {
            console.log('Message received:', event,event.data);
            const blob = event.data;

            // Use FileReader to read the Blob
            const reader = new FileReader();
            reader.onload = () => {
              try {
                // Convert the result to a string and parse it into JSON
                const jsonString: any = reader.result;
                const jsonData = JSON.parse(jsonString);
                console.log(jsonData);
                
                setMessage((prevMessages: any) => [...prevMessages, jsonData]);
                console.log("Parsed JSON data:", jsonData);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            };

            // Read the blob as text
            reader.readAsText(blob);
          };

          // When the WebSocket encounters an error
          ws.onerror = (error) => {
            console.log('WebSocket error:', error);
          };

          // When the WebSocket closes
          ws.onclose = () => {
            console.log('WebSocket connection closed');
          };

          // Store the WebSocket connection in state
          socketRef.current = ws
        })

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

  const columns: readonly any[] = [
    { id: "31", label: "Last Price" },
    { id: "82", label: "Change" },
    { id: "83", label: "%Change" },
    { id: "87", label: "Volume" },
    // { id: "billable_time_spend", label: "Open Interest" },
  ];
  const columnsStrikes: readonly any[] = [
    { id: "valid_strikes", label: "Strikes", formatHtmls:(val:number)=> val },
    // { id: "billable_time_spend", label: "Open Interest" },
  ];
  console.log(message,'message===');
  
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
      <Card>
        <div className="row mb-3">
          {(state.contract_type === 'call' || state.contract_type === 'both') && <div className={`col-sm-${state.contract_type === 'both' ? 5 : 12} col-12`}>
            <StockTable title={"Calls"} rows={message} columns={columns} showStrike={true} />
          </div>}
          {state.contract_type && <div className={`col-sm-${state.contract_type === 'both' ? 2 : 6} col-12 strike-table`}>
            <StockTable title={"Strikes"} rows={strikes} columns={columnsStrikes} showStrike={true} />
          </div>}
          {(state.contract_type === 'put' || state.contract_type === 'both') && <div className={`col-sm-${state.contract_type === 'both' ? 5 : 12} col-12`}>
            <StockTable title={"Puts"} className="grey-bg" columns={columns} rows={message} />
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
