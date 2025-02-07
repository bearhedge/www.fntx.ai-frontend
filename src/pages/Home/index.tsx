import { useEffect, useRef, useState } from "react";
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
    const socketRef = useRef<any>()
    useEffect(() => {
        // Create the WebSocket connection

        const getSessionToken = async () => {
            try {
                // const token = await AsyncStorage.getItem("userInfo").then((data) => {
                //     const parsed = data ? JSON.parse(data) : null;
                //     return parsed?.access_token || "";
                // });
                // console.log(token, `${SOCKET_BASE_URL}chat-doctor/${localSearchParams?.id}`);
                console.log('hello');
                const token = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YTFhMTA0MS0xYTA5LTQ0YzEtODM5OS1kZDQ5MTU4N2FmNWYiLCJyb2xlIjoicGF0aWVudCIsImRldmljZV9pZCI6InNhbXN1bmciLCJleHAiOjE3MzgyMTQ3NjF9.nnt6Y1YW6mV8uHfKjKEHRjdhSX7o1h5OtAoczcSFSgI'}`
                const wsStrikes = new WebSocket(`ws://192.168.1.32:9000/ws/chat-doctor/2b0c6fe3-b7f9-44a6-a5f2-c86987f87028`,null, {
                    headers: {
                      ['Set-Cookie']: cookie,
                    },
                  }
                );

                wsStrikes.onopen = () => {
                    console.log('WebSocket connected');
                };

                wsStrikes.onmessage = (event) => {
                    console.log('Received message:', event.data);
                };

                wsStrikes.onerror = (error) => {
                    console.log('WebSocket error:', error);
                };

                wsStrikes.onclose = () => {
                    console.log('WebSocket connection closed');
                };

                // Store the WebSocket connection in state
                socketRef.current = wsStrikes;

            } catch (error) {
                console.error('Error fetching session token:', error);
            }
        };
        getSessionToken();
        // Cleanup function to close the WebSocket connection when the component unmounts
        return () => {
            if (socketRef.current) {
                // socketRef.current.close();
            }
        };
    }, []);
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