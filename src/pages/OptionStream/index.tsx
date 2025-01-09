import Card from "../../component/Card";
import Button from "../../component/form/button";
import CandleStickChartWithCHMousePointer from "../../component/graph";
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
    const handleSelectedOrder = (row: any, type:string) => { }
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
    return <AppLayout>
        <div className="optionstream">
            <div className="row mb-4">
                <div className="col-md-4">
                    <Card className="d-flex align-items-center flex-row">
                        <h5>Ticker</h5>
                        <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">SPY</div>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card className="d-flex align-items-center flex-row">
                        <h5>At Close</h5>
                        <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">582.84 0.05+ (0.01)</div>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card className="d-flex align-items-center flex-row">
                        <h5>Pre Market</h5>
                        <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">582.84 0.05+ (0.01)</div>
                    </Card>
                </div>
            </div>
            <Card className="mb-4 graph">
            <CandleStickChartWithCHMousePointer data={chartRes} />
            <ul>
                {
                    chartFilter?.map((items:string,key:number)=><li key={key}><Button type="button" className="btn">{items}</Button></li>)
                }
                
            </ul>
            </Card>
            <Card>
                <div className="row mb-3 system-form-orders">
                    <div className={`col-sm-5 col-12`}>
                        <StockTable handleSelected={(row: any) => handleSelectedOrder({ ...row.call, selected: row.selected }, 'call')} title={"Calls"} rows={[]} columns={columnsCall} />
                    </div>
                    <div className={`col-sm-2 col-12 strike-table`}>
                        <StockTable title={""} rows={[]} columns={columnsStrikes} />
                    </div>
                    <div className={`col-sm-5 col-12`}>
                        <StockTable handleSelected={(row: any) => handleSelectedOrder({ ...row.put, selected: row.selected }, 'put')} title={"Puts"} className="grey-bg" columns={columnsPut} rows={[]} />
                    </div>
                </div>
            </Card>
        </div>
    </AppLayout>
}