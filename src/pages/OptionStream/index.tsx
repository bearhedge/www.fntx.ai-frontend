import { useEffect, useRef, useState } from "react";
import Fetch from "../../common/api/fetch";
import { InstrumentsProps } from "../../common/type";
import { decodeToken } from "../../common/utilits";
import Card from "../../component/Card";
import Button from "../../component/form/button";
import Loader from "../../component/form/loader";
import CandleStickChartWithCHMousePointer from "../../component/graph";
import RadioCheckboxOption from "../../component/RadioCheckbox";
import StockTable from "../../component/system/StockTable";
import AppLayout from "../../layout/appLayout";
const chartFilter = ["1d", "5d", "1m", "3m", "6m", "1y", "2y", "5y"];
const chartMinutes = [
  "1min",
  "2min",
  "3min",
  "5min",
  "15min",
  "30min",
  "1h",
  "4h",
  "1d",
  "1w",
  "1m",
  "3m",
];
const timeMapping: Record<string, string> = {
  "1d": "1min",
  "5d": "5min",
  "1m": "1d",
  "1y": "1d",
  "5y": "1y",
};
export default function OptionStream() {
  const [tickerList, setTickerList] = useState<any>([]);
  const socketRef = useRef<any>();
  const socketCandleRef = useRef<any>();
  const [order, setOrders] = useState<any>([]);
  const [instrument, setInstrument] = useState("");
  const [chartResHistory, setChartResHistory] = useState<any>([]);
  const [chartRes, setChartRes] = useState<any>([]);
  const [isLoader, setIsLoader] = useState(false)
  const [selectedTime, setSelectedTime] = useState("1min");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [conId, setConId] = useState<any>(null);
  const [atClose, setAtClose] = useState<string>("");
  const [preMarket, setpreMarket] = useState<string>("");
  // const handleSelectedOrder = (row: any, type: string) => {
  // };
  const getTicker = () => {
    Fetch("ibkr/instruments/").then((res) => {
      if (res.status) {
        const { EQUITY, COMMODITY, CRYPTO } = res.data;
        setTickerList([...EQUITY, ...CRYPTO, ...COMMODITY]);
      }
    });
  };
  useEffect(() => {
    getTicker();
  }, []);
  useEffect(() => {
    // Create the WebSocket connection
    const getSessionToken = async () => {
      const id = decodeToken(localStorage.token)?.user_id;
      try {
        const wsStrikes = new WebSocket(
          `${import.meta.env.VITE_API_SOCKET_URL
          }option-stream/strikes?user_id=${id}`
        ); // WebSocket URL must start with 'wss://'
        const wsCandleStrikes = new WebSocket(
          `${import.meta.env.VITE_API_SOCKET_URL
          }option-stream/candle-stick?user_id=${id}`
        ); // WebSocket URL must start with 'wss://'
        // When the WebSocket opens

        wsStrikes.onmessage = (event: any) => {
          const data = JSON.parse(event.data);
          if (data?.option_chain_data?.length) {
            // if (
            //   !data?.option_chain_data[0]?.put?.live_data[0][31] &&
            //   !data?.option_chain_data[0]?.call?.live_data[0][31]
            // ) {
            //   wsStrikes.close();
            //   getSessionToken();
            // }
            setOrders(data?.option_chain_data);
          }
        };
        wsCandleStrikes.onmessage = (event: any) => {
          const data = JSON.parse(event.data);
          if (data.data) {
            setIsLoader(false)
            setChartRes(data.data || []);
          }
          if (data.conId) {
            setConId(data.conId);
          }
          if (data?.at_Close) {
            setAtClose(data?.at_Close);
          }
          if (data?.pre_market_price) {
            setpreMarket(data?.pre_market_price);
          }
          // if (data?.option_chain_data?.length) {
          //     if (!data?.option_chain_data[0]?.put?.live_data[0][31] && !data?.option_chain_data[0]?.call?.live_data[0][31]) {
          //         wsStrikes.close();
          //         getSessionToken()
          //     }
          //     setOrders(data?.option_chain_data)
          // }
        };
        // When the WebSocket encounters an error
        wsStrikes.onerror = (error) => {
          console.log("WebSocket error:", error);
        };

        // When the WebSocket closes
        wsStrikes.onclose = () => {
          console.log("WebSocket connection closed");
        };

        // Store the WebSocket connection in state
        socketRef.current = wsStrikes;
        socketCandleRef.current = wsCandleStrikes;
        // })
      } catch (error) {
        console.error("Error fetching session token:", error);
      }
    };
    getSessionToken();
    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (socketCandleRef.current) {
        socketCandleRef.current.close();
      }
    };
  }, []);
  const columnsCall: readonly any[] = [
    {
      id: "call",
      label: "Last Price",
      formatHtmls: (item: any) =>
        (item?.call?.live_data?.length &&
          item?.call?.live_data[0][31]?.replace("C", "")) ||
        "-",
    },
    {
      id: "call",
      label: "Change",
      formatHtmls: (item: any) =>
        (item?.call?.live_data?.length && item?.call?.live_data[0][82]) || "-",
    },
    {
      id: "call",
      label: "%Change",
      formatHtmls: (item: any) =>
        (item?.call?.live_data?.length && item?.call?.live_data[0][83]) || "-",
    },
    {
      id: "call",
      label: "Volume",
      formatHtmls: (item: any) =>
        (item?.call?.live_data?.length && item?.call?.live_data[0][87]) || "-",
    },
    {
      id: "call",
      label: "Open Interest",
      formatHtmls: (item: any) =>
        (item?.call?.live_data?.length && item?.call?.live_data[0][7638]) ||
        "-",
    },
  ];
  const columnsPut: readonly any[] = [
    {
      id: "put",
      label: "Last Price",
      formatHtmls: (item: any) =>
        (item?.put?.live_data?.length &&
          item?.put?.live_data[0][31]?.replace("C", "")) ||
        "-",
    },
    {
      id: "put",
      label: "Change",
      formatHtmls: (item: any) =>
        (item?.put?.live_data?.length && item?.put?.live_data[0][82]) || "-",
    },
    {
      id: "put",
      label: "%Change",
      formatHtmls: (item: any) =>
        (item?.put?.live_data?.length && item?.put?.live_data[0][83]) || "-",
    },
    {
      id: "put",
      label: "Volume",
      formatHtmls: (item: any) =>
        (item?.put?.live_data?.length && item?.put?.live_data[0][87]) || "-",
    },
    {
      id: "put",
      label: "Open Interest",
      formatHtmls: (item: any) =>
        (item?.put?.live_data?.length && item?.put?.live_data[0][7638]) || "-",
    },
  ];
  const columnsStrikes: readonly any[] = [
    { id: "strike", label: "Strikes" },
    // { id: "billable_time_spend", label: "Open Interest" },
  ];
  const onChangeTicker = (item: InstrumentsProps) => {
    setChartRes([])
    setIsLoader(true)
    setAtClose('');
    setpreMarket('');
    setInstrument(item.instrument);
    socketRef.current.send(JSON.stringify({ ticker: item.instrument }));
    socketCandleRef.current.send(JSON.stringify({ ticker: item.instrument }));
  };
  const handleChartData = (e: any, item: string) => {
    let type = e.target.name,
      value = e.target.value;
    let params = {
      period: "",
      bar: "",
      conid: "",
    };
    setSelectedFilter(item)
    if (type === "button") {
      params.bar = item;
      if (timeMapping[item]) {
        let timeValue = timeMapping[item];
        params.period = timeValue;
        setSelectedTime(timeValue); // Update the select value when a button is clicked
      }
    } else {
      params.period = value;
    }
    params.conid = conId;

    Fetch("ibkr/history_data", params, { method: "post" }).then(res => {
      if (res.status) {
        const data = res.data?.history_data?.data || []
        setChartResHistory(data);
      }
    })
  };
  // [...chartRes,...chartResHistory]
  const candleRes = [...chartRes, ...chartResHistory]
  return (
    <AppLayout>
      <div className="optionstream">
        <div className="row mb-4">
          <div className="col-md-12 ">
            <Card>
              <h5>Ticker</h5>
              <div className="row mb-4">
                {tickerList?.map((item: InstrumentsProps) => (
                  <div className="col-sm-3 col-12 mb-1" key={item.id}>
                    <RadioCheckboxOption
                      type="radio"
                      label={item.instrument}
                      checked={instrument === item.instrument}
                      value={instrument}
                      name="instrument"
                      id={item.instrument.replace(/ /g, "")}
                      handleChange={() => onChangeTicker(item)}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
          {isLoader && <div className="mt-4">
            <Loader dark={true} />
          </div>
          }
          {/* {
            !!chartRes?.length && (
              <div className="d-flex justify-content-center  vh-100 mt-4">
                <div className="spinner-border text-secondary" style={{ color: "#4D4D4D" }} role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            )
          } */}
          {!!chartRes?.length && (
            <>
              <div className="col-md-6 mt-4">
                <Card className="d-flex align-items-center flex-row">
                  <h5>At Close</h5>
                  <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                    {atClose}
                  </div>
                </Card>
              </div>
              <div className="col-md-6 mt-4">
                <Card className="d-flex align-items-center flex-row">
                  <h5>Pre Market</h5>
                  <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                    {preMarket}
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
        {!!chartRes?.length && (
          <Card className="mb-4 graph">
            {candleRes?.length && <CandleStickChartWithCHMousePointer data={candleRes} />}
            <div className=" items-center flex-row justify-between gap-4 mt-2 d-flex flex-row">
              <ul className="flex gap-2">
                {chartFilter?.map((item: string, key: number) => (
                  <li key={key}>
                    <Button
                      type="button"
                      name="button"
                      className={`btn ${selectedFilter === item && 'active'}`}
                      onClick={(e) => handleChartData(e, item)}
                    >
                      {item}
                    </Button>
                  </li>
                ))}
              </ul>

              <select
                name="time"
                className="border rounded px-2 py-1"
                style={{ width: "100px" }}
                onChange={(e) => handleChartData(e, "item")}
                value={selectedTime}
              >
                {chartMinutes?.map((item: string, index: number) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </Card>
        )}
        {!!order?.length && (
          <Card>
            <div className="row mb-3 system-form-orders">
              <div className={`col-sm-5 col-12`}>
                <StockTable
                  // handleSelected={(row: any) =>
                  //   handleSelectedOrder(
                  //     { ...row.call, selected: row.selected },
                  //     "call"
                  //   )
                  // }
                  title={"Calls"}
                  rows={order}
                  columns={columnsCall}
                />
              </div>
              <div className={`col-sm-2 col-12 strike-table`}>
                <StockTable title={""} rows={order} columns={columnsStrikes} />
              </div>
              <div className={`col-sm-5 col-12`}>
                <StockTable
                  // handleSelected={(row: any) =>
                  //   handleSelectedOrder(
                  //     { ...row.put, selected: row.selected },
                  //     "put"
                  //   )
                  // }
                  title={"Puts"}
                  className="grey-bg"
                  columns={columnsPut}
                  rows={order}
                />
              </div>
            </div>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
