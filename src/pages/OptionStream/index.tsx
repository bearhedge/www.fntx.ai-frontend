import { useEffect, useRef, useState } from "react";
import Fetch from "../../common/api/fetch";
import { InstrumentsProps } from "../../common/type";
import { decodeToken } from "../../common/utilits";
import Card from "../../component/Card";
import Button from "../../component/form/button";
import CandleStickChartWithCHMousePointer from "../../component/graph";
import RadioCheckboxOption from "../../component/RadioCheckbox";
import StockTable from "../../component/system/StockTable";
import AppLayout from "../../layout/appLayout";
import { chartRes } from "../../lib/dummyArray";
const chartFilter = [
    '1d',
    '5d',
    '1m',
    '3m',
    '6m',
    '1y',
    '2y',
    '5y',
]
export default function OptionStream() {
    const [tickerList, setTickerList] = useState<any>([]);
    const socketRef = useRef<any>()
    const socketCandleRef = useRef<any>()
    const [order, setOrders] = useState<any>([]);
    const [instrument, setInstrument] = useState('')
    const handleSelectedOrder = (row: any, type: string) => { }

    const getTicker = () => {
        Fetch("ibkr/instruments/").then((res) => {
            if (res.status) {
                const { EQUITY, COMMODITY, CRYPTO } = res.data
                setTickerList([...EQUITY, ...CRYPTO, ...COMMODITY]);
            }
        });
    };
    useEffect(() => {
        getTicker()
    }, [])
    useEffect(() => {
        // Create the WebSocket connection
        const getSessionToken = async () => {
            const id = decodeToken(localStorage.token)?.user_id
            try {
                const wsStrikes = new WebSocket(`${import.meta.env.VITE_API_SOCKET_URL}option-stream/strikes?user_id=${id}`); // WebSocket URL must start with 'wss://'
                const wsCandleStrikes = new WebSocket(`${import.meta.env.VITE_API_SOCKET_URL}option-stream/candle-stick?user_id=${id}`); // WebSocket URL must start with 'wss://'
                // When the WebSocket opens
                
                wsStrikes.onmessage = (event: any) => {
                    const data = JSON.parse(event.data)
                    if (data?.option_chain_data?.length) {
                        if (!data?.option_chain_data[0]?.put?.live_data[0][31] && !data?.option_chain_data[0]?.call?.live_data[0][31]) {
                            wsStrikes.close();
                            getSessionToken()
                        }
                        setOrders(data?.option_chain_data)
                    }
                }
                wsCandleStrikes.onmessage = (event: any) => {
                    const data = JSON.parse(event.data)
                    console.log(data);
                    
                    // if (data?.option_chain_data?.length) {
                    //     if (!data?.option_chain_data[0]?.put?.live_data[0][31] && !data?.option_chain_data[0]?.call?.live_data[0][31]) {
                    //         wsStrikes.close();
                    //         getSessionToken()
                    //     }
                    //     setOrders(data?.option_chain_data)
                    // }
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
                socketCandleRef.current = wsCandleStrikes
                // })

            } catch (error) {
                console.error('Error fetching session token:', error);
            }
        };
        getSessionToken();
        // Cleanup function to close the WebSocket connection when the component unmounts
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);
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
    const onChangeTicker = (item: InstrumentsProps) => {
        setInstrument(item.instrument)
        socketRef.current.send(JSON.stringify({ ticker: item.instrument }));
        socketCandleRef.current.send(JSON.stringify({ ticker: item.instrument }));

    }
    return <AppLayout>
        <div className="optionstream">
            <div className="row mb-4">
                <div className="col-md-6">
                    <Card className="d-flex align-items-center flex-row">
                        <h5>At Close</h5>
                        <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">582.84 0.05+ (0.01)</div>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card className="d-flex align-items-center flex-row">
                        <h5>Pre Market</h5>
                        <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">582.84 0.05+ (0.01)</div>
                    </Card>
                </div>
                <div className="col-md-12 mt-4">
                    <Card>
                        <h5>Ticker</h5>
                        <div className="row mb-4">
                            {
                                tickerList?.map((item: InstrumentsProps) => <div className="col-sm-3 col-12 mb-1" key={item.id}>
                                    <RadioCheckboxOption
                                        type="radio"
                                        label={item.instrument}
                                        checked={instrument === item.instrument}
                                        value={instrument}
                                        name="instrument"
                                        id={item.instrument.replace(/ /g, "")}
                                        handleChange={() => onChangeTicker(item)}
                                    />
                                </div>)
                            }
                        </div>
                    </Card>
                </div>
            </div>
            <Card className="mb-4 graph">
                <CandleStickChartWithCHMousePointer data={chartRes} />
                <ul>
                    {
                        chartFilter?.map((items: string, key: number) => <li key={key}><Button type="button" className="btn">{items}</Button></li>)
                    }

                </ul>
            </Card>
            <Card>
                <div className="row mb-3 system-form-orders">
                    <div className={`col-sm-5 col-12`}>
                        <StockTable handleSelected={(row: any) => handleSelectedOrder({ ...row.call, selected: row.selected }, 'call')} title={"Calls"} rows={order} columns={columnsCall} />
                    </div>
                    <div className={`col-sm-2 col-12 strike-table`}>
                        <StockTable title={""} rows={order} columns={columnsStrikes} />
                    </div>
                    <div className={`col-sm-5 col-12`}>
                        <StockTable handleSelected={(row: any) => handleSelectedOrder({ ...row.put, selected: row.selected }, 'put')} title={"Puts"} className="grey-bg" columns={columnsPut} rows={order} />
                    </div>
                </div>
            </Card>
        </div>
    </AppLayout>
}