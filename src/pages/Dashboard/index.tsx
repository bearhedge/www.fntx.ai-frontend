// import Card from "../../component/Card";
// import CircularButton from "../../component/system/CircularButton";
// import RangeSlider from "../../component/system/RangeSlider";
import AppLayout from "../../layout/appLayout";

export default function Dashboard() {
    return <AppLayout>
        <div className="dashboard">
            <h4 className="text-center">Coming Soon</h4>
            {/* <div className="row mb-4">
                <div className="col-md-6">
                    <Card className="d-flex align-items-center flex-row">
                        <h5>Ticker</h5>
                        <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">SPY</div>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card className="d-flex align-items-center flex-row">
                        <h5>Expiry</h5>
                        <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">10 Sep 2024</div>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Card>
                        <div className="d-flex align-items-center flex-row mb-4">
                            <div className="system-trade-card-btn mb-0 d-flex align-items-center justify-content-center">50.0%</div>
                            <RangeSlider name='take_profit' className='mx-3' min={0} max={50} count={11} oddNumbers={true}/> 
                        </div>
                        <div className="d-flex align-items-center flex-row">
                            <div className="system-trade-card-btn mb-0 d-flex align-items-center justify-content-center">01:00 - 03:30</div>
                            <RangeSlider name='take_profit' className='mx-3' min={0} max={50} count={11} oddNumbers={true}/> 
                        </div>
                    </Card>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-4">
                            <CircularButton text={"P"} />
                        </div>
                        <div className="col-md-4">
                            <CircularButton text={"N"} />
                        </div>
                        <div className="col-md-4">
                            <CircularButton text={"D"} />
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    </AppLayout>
}