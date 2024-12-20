import { useEffect, useState } from "react";
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
interface IpropsState {
    instrument:string,
    ticker_data: any,
    timer: any,
    time_frame: string,
    time_steps: string,
    confidence_level:number | null
    contract_type:string
}
export default function System() {
  const params = useParams();
  const navigate = useNavigate();
  const [tickerList, setTickerList] = useState({});
  const [conIds, setConIds] = useState([]);
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [id, setId] = useState('')
  const [state, setState] = useState<IpropsState>({
    instrument: "",
    ticker_data: {},
    timer: {},
    time_frame: '',
    time_steps: '',
    confidence_level:null,
    contract_type:''
  });
  useEffect(() => {
    if (params.id) {
      setTab(+params.id);
    }
  }, [params.id]);
  useEffect(() => {
    getTicker();
    getSystemList();
  }, []);
  const handleTab = (val: number) => {
    setTab(val);
    navigate(`/system/${val}`, { replace: true });
  }
  // SYSTEM FUNCTIONS
  const getSystemList = () => {
    Fetch("ibkr/system-data/").then((res) => {
      if (res.status) {
        setId(res.data.id)
        getConIds(res.data.instrument?.instrument)
        setState(prev => ({
          ...prev,
          instrument: res.data.instrument?.id,
          ticker_data: res.data?.ticker_data,
          timer: res.data?.timer,
          confidence_level:res.data?.confidence_level,
          time_frame:res.data?.time_frame,
          time_steps:res.data?.time_steps,
        }))
      }
    });
  };
  const handleStepSubmit = (val: number) => {
    setIsLoading(true)
    Fetch(`ibkr/system-data/${id ? id + '/' : ''}`, state, { method: id ? 'patch' : 'post' }).then((res) => {
      setIsLoading(false)
      if (res.status) {
        setId(res.data.id)
        handleTab(val)
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
    setConIds([])
    Fetch(`ibkr/symbol_conid?symbol=${instrument}`).then((res) => {
      if (res.status) {
        setConIds(res.data?.data);
      }
    });
  }
  const onChangeTicker = (val: InstrumentsProps) => {
    getConIds(val.instrument)
    setState(prev => ({ ...prev, instrument: val.id, ticker_data: {} }))
  };


  // Timer Steps
  const handleChangeTime = (val: string) => {
    const obj = {
      timer_value: val,
      original_timer_value: val,
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
      Fetch(`ibkr/range`, { time_frame: obj?.time_frame, time_steps: obj?.time_steps,conid:obj.ticker_data?.conid }, { method: 'post' })
    }
    setState(obj)
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
            conIds={conIds}
            list={tickerList}
            isLoading={isLoading}
            onChange={onChange}
            handleTabChange={() => handleStepSubmit(1)}
            onChangeTicker={onChangeTicker}
          />
        )}
        {tab === 1 && <Timing
          state={state}
          handleChangeTime={handleChangeTime}
          isLoading={isLoading}
          handleTabChange={() => handleStepSubmit(2)}
        />}
        {tab === 2 && <Range state={state} isLoading={isLoading} handleChangeRange={handleChangeRange} handleTabChange={() => handleStepSubmit(3)} />}
        {tab === 3 && <Risk onChange={onChange} isLoading={isLoading} state={state} handleTabChange={() => handleStepSubmit(4)} />}
        {tab === 4 && <Contracts isLoading={isLoading} state={state} onChange={onChange} handleTabChange={() => handleStepSubmit(5)} />}
        {tab === 5 && <Trade handleTabChange={() => handleStepSubmit(6)} />}
        {tab === 6 && <Manage handleTabChange={() => handleStepSubmit(6)} />}
      </div>
    </AppLayout>
  );
}
