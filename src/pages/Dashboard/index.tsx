// import { Column } from "../../common/type";
// import Badge from "../../component/badge";
import Card from "../../component/Card";
// import DynamicTable from "../../component/Table";
import AppLayout from "../../layout/appLayout";
// import { notify, orders } from "../../lib/dummyArray";

export default function Dashboard() {
    // const columns: Column[] = [
    //     { id: "symbol", label: "Symbol" },
    //     { id: "type", label: "Type", formatHtmls: (item) => <Badge name={item.type} type={item.type === 'Sell' ? 'danger' : 'primary'} /> },
    //     { id: "open_date", label: "Open Date", },
    //     { id: "open_price", label: "Open Price", },
    //     { id: "sl", label: "SL", },
    //     { id: "tp", label: "TP", },
    //     { id: "close_date", label: "Close Date", },
    //     { id: "close_price", label: "Close Price", },
    //     { id: "lots", label: "Lots", },
    //     { id: "profit", label: "Profit", formatHtmls: (item) => <div className={`color-${item.profit?.startsWith('-') ? 'danger' : 'primary'}`}>{item.profit}</div> },
    //     { id: "duration", label: "Duration", },
    //     { id: "gain", label: "Gain", formatHtmls: (item) => <div className={`color-${item.gain?.startsWith('-') ? 'danger' : 'primary'}`}>{item.gain}</div> },
    // ];
    // const columnsNotify: Column[] = [
    //     { id: "time", label: "Time" },
    //     { id: "type", label: "Type", formatHtmls: (item) => <Badge name={item.type} type='gray' /> },
    //     { id: "message", label: "Message", },
    // ];
    return <AppLayout>
        <div className="row ">
            <div className="col-6">
                <div className="row">
                    <div className="col-4">
                        <Card className='card__count mb-3'>
                            <label>Average Win</label>
                            <h5>$642.00</h5>
                        </Card>
                    </div>
                    <div className="col-4">
                        <Card className='card__count mb-3'>
                            <label>Average Win</label>
                            <h5>$642.00</h5>
                        </Card>
                    </div>
                    <div className="col-4">
                        <Card className='card__count mb-3'>
                            <label>Average Win</label>
                            <h5>$642.00</h5>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <Card className='card__count mb-3'>
                            <label>Average Win</label>
                            <h5>$642.00</h5>
                        </Card>
                    </div>
                    <div className="col-4">
                        <Card className='card__count mb-3'>
                            <label>Average Win</label>
                            <h5>$642.00</h5>
                        </Card>
                    </div>
                    <div className="col-4">
                        <Card className='card__count mb-3'>
                            <label>Average Win</label>
                            <h5>$642.00</h5>
                        </Card>
                    </div>
                </div>
            </div>
            {/* <div className="col-6">
                <Card className='card__head mb-3'>
                    <h4>Notifications</h4>
                    <DynamicTable columns={columnsNotify} rows={notify} rowsPerPage={2} />
                </Card>
            </div> */}
        </div>
        {/* <Card className='card__head'>
            <h4>Order History</h4>
            <DynamicTable columns={columns} rows={orders} rowsPerPage={5} />
        </Card> */}
    </AppLayout>
}