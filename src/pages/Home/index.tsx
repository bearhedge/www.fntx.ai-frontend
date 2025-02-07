import { useEffect, useState } from "react";
import Fetch from "../../common/api/fetch";
import Card from "../../component/Card";
import InputCard from "../../component/system/InputCard";
import AppLayout from "../../layout/appLayout";
import NetliquidationIIcon from '@assets/svg/ic_netliquidation.svg'
import InitmarginreqIcon from '@assets/svg/ic_initmarginreq.svg'
import TotalcashvalueIcon from '@assets/svg/ic_totalcashvalue.svg'
import MaintmarginreqIcon from '@assets/svg/ic_maintmarginreq.svg'
import AvailablefundsIcon from '@assets/svg/ic_availablefunds.svg'
import ExcessliquidityIcon from '@assets/svg/ic_excessliquidity.svg'
import BuyingpowerIcon from '@assets/svg/ic_buyingpower.svg'
import TotalcontractsIcon from '@assets/svg/ic_totalcontracts.svg'
const list = [
    {
        label: 'Net Liquidation Value',
        name: 'netliquidation',
        icon: NetliquidationIIcon,
    },
    {
        label: 'Current Initial Margin',
        name: 'initmarginreq',
        icon: InitmarginreqIcon,
    },
    {
        label: 'Cash',
        name: 'totalcashvalue',
        icon: TotalcashvalueIcon,
    },
    {
        label: 'Current Maintenance Margin',
        name: 'maintmarginreq',
        icon: MaintmarginreqIcon,
    },
    {
        label: 'Current Available Funds',
        name: 'availablefunds',
        icon: AvailablefundsIcon,
    },
    {
        label: 'Current Excess Liquidity',
        name: 'excessliquidity',
        icon: ExcessliquidityIcon,
    },
    {
        label: 'Buying Power',
        name: 'buyingpower',
        icon: BuyingpowerIcon,
    },
    {
        label: 'Estimated Total Contracts',
        name: '',
        icon: TotalcontractsIcon,
    }
]
export default function HomeDashboard() {
    const [data,setData]=useState<any>({})
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData =()=>{
        Fetch('ibkr/account_summary/').then(res=>{
            if(res.status){
                setData(res.data)
            }
        })
    }
    return <AppLayout>
        <div className="row home-dashboard">
            <div className="col-md-6">
                {
                    list?.map((items, key) => <Card key={key} className={`d-flex ${key === (list.length - 1)? '':'mb-4'} home-dashboard-list align-items-center justify-content-between flex-row p-4`}>
                        <div className="d-flex align-items-center">
                            <img src={items.icon} alt={items.label} className='me-2'/>
                            <p className="mb-0">{items.label}</p>
                        </div>
                        {items.name && <p className="mb-0">{data[items.name]?.currency} {data[items.name]?.amount}</p>}
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