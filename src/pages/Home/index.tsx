import Card from "../../component/Card";
import InputCard from "../../component/system/InputCard";
import AppLayout from "../../layout/appLayout";
const list = [
    {
        label: 'Net Liquidation Value',
        name: 'HKD 100,000.00',
        icon: '',
    },
    {
        label: 'Current Initial Margin',
        name: 'HKD 0.00',
        icon: '',
    },
    {
        label: 'Cash',
        name: 'HKD 100,000.00',
        icon: '',
    },
    {
        label: 'Current Maintenance Margin',
        name: 'HKD 0.00',
        icon: '',
    },
    {
        label: 'Current Available Funds',
        name: 'HKD 100,000.00',
        icon: '',
    },
    {
        label: 'Current Excess Liquidity',
        name: 'HKD 600,000.00',
        icon: '',
    },
    {
        label: 'Buying Power',
        name: 'HKD 100,000.00',
        icon: '',
    },
    {
        label: 'Estimated Total Contracts',
        name: 'HKD 30',
        icon: '',
    }
]
export default function HomeDashboard() {
    return <AppLayout>
        <div className="row home-dashboard">
            <div className="col-md-6">
                {
                    list?.map((items, key) => <Card key={key} className={`d-flex ${key === (list.length - 1)? '':'mb-4'} home-dashboard-list align-items-center justify-content-between flex-row p-4`}>
                        <div className="d-flex">
                            <p className="mb-0">{items.label}</p>
                        </div>
                        <p className="mb-0">{items.name}</p>
                    </Card>)
                }

            </div>
            <div className="col-md-6">
                <InputCard
                    text={
                        " According to the previous 2 time steps under the 1-day timeframe, the upper bound is at __________ and the lower bound is at __________."
                    }
                />
            </div>
        </div>
    </AppLayout>
}