import { useState } from "react";
import Card from "../../component/Card";
import Ticker from "../../component/system/ticker";
import Tabs from "../../component/Tabs";
import AppLayout from "../../layout/appLayout";

export default function System() {
    const [tab, setTab] = useState(0)
    return <AppLayout>
        <Card>
            <Tabs tab={tab} handleTab={setTab} />
        </Card>
        <Ticker />
    </AppLayout>
}