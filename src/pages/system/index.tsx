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

export default function System() {
  const params = useParams();
  const navigate = useNavigate();
  const [tickerList, setTickerList] = useState({});
  const [conIds, setConIds] = useState([]);
  const [tab, setTab] = useState(0);
  const [state, setState] = useState({
    instruments: "",
    instrument_data:''

    
  });
  useEffect(() => {
    getTicker();
  }, []);
  const getTicker = () => {
    Fetch("ibkr/instruments/").then((res) => {
      if (res.status) {
        setTickerList(res.data);
      }
    });
  };
  useEffect(() => {
    if (params.id) {
      setTab(+params.id);
    }
  }, [params.id]);
  const handleTab = (val: number) => {
    setTab(val);
    navigate(`/system/${val}`, { replace: true });
  };
  const onChangeTicker = (val: InstrumentsProps) => {
    Fetch(`ibkr/symbol_conid?symbol=${val.instrument}`).then((res) => {
      if (res.status) {
        setConIds(res.data?.data);
      }
    });
    setState(prev=>({...prev, instruments:val.id}))
  };
  console.log(conIds);
  
  return (
    <AppLayout>
      <div className="system">
        <Card className="mb-4 system-tabs">
          <Tabs tab={tab} handleTab={handleTab} />
        </Card>
        {tab === 0 && (
          <Ticker
            instrument={state.instruments}
            conIds={conIds}
            list={tickerList}
            handleTabChange={() => handleTab(1)}
            onChange={onChangeTicker}
          />
        )}
        {tab === 1 && <Timing handleTabChange={() => handleTab(2)} />}
        {tab === 2 && <Range handleTabChange={() => handleTab(3)} />}
        {tab === 3 && <Risk handleTabChange={() => handleTab(4)} />}
        {tab === 4 && <Contracts handleTabChange={() => handleTab(5)} />}
        {tab === 5 && <Trade handleTabChange={() => handleTab(6)} />}
        {tab === 6 && <Manage handleTabChange={() => handleTab(6)} />}
      </div>
    </AppLayout>
  );
}
