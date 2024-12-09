import { useState } from "react";
import Card from "../../component/Card";
import Ticker from "../../component/system/ticker";
import Tabs from "../../component/Tabs";
import AppLayout from "../../layout/appLayout";
import Timing from "../../component/system/timing";
import Range from "../../component/system/range";
import Risk from "../../component/system/Risk";
import Contracts from "../../component/system/Contracts";

export default function System() {
  const [tab, setTab] = useState(0);

  return (
    <AppLayout>
      <div className="system">
        <Card className="mb-4">
          <Tabs tab={tab} handleTab={setTab} />
        </Card>
        {tab === 0 && <Ticker handleTabChange={() => setTab(1)} />}
        {tab === 1 && <Timing handleTabChange={() => setTab(2)} />}
        {tab === 2 && <Range handleTabChange={() => setTab(3)} />}
        {tab === 3 && <Risk handleTabChange={() => setTab(4)} />}
        {tab === 4 && <Contracts handleTabChange={() => setTab(5)} />}
      </div>
    </AppLayout>
  );
}
