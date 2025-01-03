import { useEffect, useRef, useState } from "react";
import Card from "../../component/Card";
import Ticker from "../../component/system/steps/ticker";
import Tabs from "../../component/Tabs";
import AppLayout from "../../layout/appLayout";
import Timing from "../../component/system/steps/timing";
import Range from "../../component/system/steps/range";
import Risk from "../../component/system/steps/Risk";
import Contracts from "../../component/system/steps/Contracts";
import Trade from "../../component/system/steps/trade";
import Manage from "../../component/system/steps/manage";
import { useNavigate, useParams } from "react-router-dom";
import Fetch from "../../common/api/fetch";
import { InstrumentsProps } from "../../common/type";
import { arrayString } from "../../lib/utilits";
interface IpropsState {
  instrument: string,
  ticker_data: any,
  timer: any,
  original_timer_value: string,
  time_frame: string | null,
  time_steps: string | null,
  confidence_level: number | null
  contract_type: string
}
export default function System() {
  const params = useParams();
  const navigate = useNavigate();
  const [tickerList, setTickerList] = useState({});
  const [conIds, setConIds] = useState([]);
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingConid, setIsLoadingConid] = useState(false)
  const [id, setId] = useState('')
  const [errorMessage, setErrorMsg] = useState('')
  const [bound, setBound] = useState({
    lower_bound: null,
    upper_bound: null,
  })
  const [selectedOrder, setSelectedOrder] = useState<any>({
    call: '',
    put: ''
  })
  const [state, setState] = useState<IpropsState>({
    instrument: "",
    ticker_data: {},
    timer: {},
    time_frame: null,
    original_timer_value: '',
    time_steps: null,
    confidence_level: null,
    contract_type: ''
  });
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
        wsStrikes.onmessage = (event: any) => {
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
  }, [state.ticker_data, tab]);
  useEffect(() => {
    if (params.id) {
      setTab(+params.id);
    }
  }, [params.id]);
  useEffect(() => {
    getTicker();
    getSystemList();
  }, [params.id]);
  const handleTab = (val: number) => {
    setTab(val);
    navigate(`/system/${val}`, { replace: true });
  }
  // SYSTEM FUNCTIONS
  const getSystemList = () => {
    Fetch("ibkr/system-data/").then((res) => {
      if (res.status) {
        if (res.data?.id) {
          setId(res.data.id)
          getConIds(res.data.instrument?.instrument)
          // setTab(res.data.form_step);
          setBound({
            lower_bound: res.data.lower_bound,
            upper_bound: res.data.upper_bound,
          })
          setState(prev => ({
            ...prev,
            instrument: res.data.instrument?.id,
            ticker_data: { ...res.data?.ticker_data, instruments_opt: res.data.instrument?.instrument_type },
            timer: res.data?.timer,
            confidence_level: res.data?.confidence_level,
            original_timer_value: res.data?.original_timer_value,
            time_frame: res.data?.time_frame,
            time_steps: res.data?.time_steps,
          }))
        }
      }
    });
  };
  const handleStepSubmit = (val: number) => {
    setIsLoading(true)
    Fetch(`ibkr/system-data/${id ? id + '/' : ''}`, { ...state, ...bound, form_step: tab }, { method: id ? 'patch' : 'post' }).then((res) => {
      setIsLoading(false)
      if (res.status) {
        setId(res.data.id)
        handleTab(val)
      } else {
        let resErr = arrayString(res);
        setErrorMsg(resErr.error)
      }
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'ticker_data') {
      setState(prev => ({ ...prev, [name]: JSON.parse(value) }))
    } else {
      setState(prev => ({ ...prev, [name]: value }))
    }
  }


  // ticker first step
  const getTicker = () => {
    Fetch("ibkr/instruments/").then((res) => {
      if (res.status) {
        setTickerList(res.data);
      }
    });
  };
  const getConIds = (instrument: string) => {
    setIsLoadingConid(true)
    setConIds([])
    Fetch(`ibkr/symbol_conid?symbol=${instrument}`).then((res) => {
      if (res.status) {
        setConIds(res.data?.data);
      }
      setIsLoadingConid(false)
    });
  }
  const onChangeTicker = (val: InstrumentsProps) => {
    getConIds(val.instrument)
    setState(prev => ({ ...prev, instrument: val.id, ticker_data: {} }))
  };


  // Timer Steps
  const handleChangeTime = (val: number | null) => {
    const obj = {
      timer_value: val,
      original_timer_value: val,
      place_order: 'P',
      start_time: new Date()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    Fetch(`ibkr/timer/`, obj, { method: 'post' }).then((res) => {
      if (res.status) {
        setConIds(res.data?.data);
      }
    });
    setState(prev => ({
      ...prev, timer: obj
    }))
  }

  //Range Steps
  const handleChangeRange = (val: string | number, name: string) => {
    const obj = {
      ...state,
      [name]: val
    }
    if (obj?.time_frame && obj?.time_steps) {
      Fetch(`ibkr/range`, { time_frame: obj?.time_frame, time_steps: obj?.time_steps }, { method: 'post' }).then(res => {
        if (res.status) {
          const { lower_bound, upper_bound } = res.data
          setBound({
            lower_bound: lower_bound,
            upper_bound: upper_bound,
          })
        }
      })
    }
    setState(obj)
  }
  const handleSelectedOrder = (item: any, type: string) => {
    setSelectedOrder((prev: any) => ({ ...prev, [type]: item }))
  }

  return (
    <AppLayout>
      <div className="system">
        <Card className="mb-4 system-tabs">
          <Tabs tab={tab} handleTab={handleTab} />
        </Card>
        {tab === 0 && (
          <Ticker
            state={state}
            errorMessage={errorMessage}
            conIds={conIds}
            isLoadingConid={isLoadingConid}
            list={tickerList}
            isLoading={isLoading}
            onChange={onChange}
            handleTabChange={() => handleStepSubmit(1)}
            onChangeTicker={onChangeTicker}
          />
        )}
        {tab === 1 && <Timing
          state={state}
          errorMessage={errorMessage}
          handleChangeTime={handleChangeTime}
          updatePlaceOrder={(val) => setState(prev => ({ ...prev, timer: { ...prev.timer, place_order: 'N' } }))}
          isLoading={isLoading}
          handleTabChange={() => handleStepSubmit(2)}
        />}
        {tab === 2 && <Range bound={bound} errorMessage={errorMessage} state={state} isLoading={isLoading} handleChangeRange={handleChangeRange} handleTabChange={() => handleStepSubmit(3)} />}
        {tab === 3 && <Risk errorMessage={errorMessage} onChange={onChange} isLoading={isLoading} state={state} handleTabChange={() => handleStepSubmit(4)} />}
        {tab === 4 && <Contracts order={order} selectedOrder={selectedOrder} handleSelectedOrder={handleSelectedOrder} errorMessage={errorMessage} isLoading={isLoading} state={state} onChange={onChange} handleTabChange={() => handleStepSubmit(5)} />}
        {tab === 5 && <Trade state={state} selectedOrder={selectedOrder} handleTabChange={() => handleTab(6)} />}
        {tab === 6 && <Manage handleTabChange={() => handleStepSubmit(6)} />}
      </div>
    </AppLayout>
  );
}
