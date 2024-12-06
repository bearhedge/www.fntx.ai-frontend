import { useState } from "react";
import Card from "../../component/Card";
import Ticker from "../../component/system/ticker";
import Tabs from "../../component/Tabs";
import AppLayout from "../../layout/appLayout";
import Timing from "../../component/system/timing";
import Range from "../../component/system/range";
import Risk from "../../component/system/Risk";

export default function System() {
  const [tab, setTab] = useState(0);

  return (
    <AppLayout>
      <div className="system">
        <Card className="mb-4">
          <Tabs tab={tab} handleTab={setTab} />
        </Card>
        {tab === 0 && <Ticker />}
        {tab === 1 && <Timing />}
        {tab == 2 && <Range />}
        {tab == 3 && <Risk />}
      </div>
    </AppLayout>
  );
}
