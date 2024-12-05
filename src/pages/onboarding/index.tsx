import { useEffect, useState } from "react";
import Fetch from "../../common/api/fetch";
import Card from "../../component/Card";
import Button from "../../component/form/button";
import BaseLayout from "../../layout/baseLayout";
import { IBKRMarginIco, NFTMarketplaceIco, SubscriptionDataIco, TradingIco, WalletIntegrationIco, ArrowIco } from "../../lib/icons";
import { arrayString } from "../../lib/utilits";
import TickDarkIco from "@assets/svg/tick-dark.svg"
import TickIco from "@assets/svg/tick.svg"
import Alert from "../../component/Alert";
import LoaderSpin from "../../component/loader";

export default function OnBoarding() {
    const [isRefreshIbkr, setIsRefreshIbkr] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [platform, setPlatform] = useState({
        ibkr: false,
        active_subscription: false,
        metamask_address: false
    })
    const [platformError, setPlatformError] = useState({
        ibkr: '',
        active_subscription: '',
        metamask_address: ''
    })
    useEffect(() => {
        getPlatformConnected()
    }, [])
    const getPlatformConnected = () => {
        Fetch('ibkr/onboarding/user-onboarding').then((res: any) => {
            if (res.status) {
                setPlatform((prev) => ({ 
                    ...prev,
                    ibkr: res.data?.authenticated,
                    active_subscription: res.data?.active_subscription,
                    metamask_address: res.data?.metamask_address
                }))
            }
            setIsRefreshIbkr(false)
        })
    }
    const getIbkrConnected = () => {
        if(platform.ibkr){
            return;
        }
        Fetch('ibkr/auth-status/').then((res: any) => {
            if (res.status) {
    console.log(platform.ibkr,res?.data);
                if (res?.data?.authenticated) {
                    setPlatform((prev) => ({ ...prev, ibkr: res?.data?.authenticated }))
                    setPlatformError((prev) => ({ ...prev, ibkr: '' }))
                    setIsLoading(false)
                    setIsRefreshIbkr(false)
                } else if (res?.data?.authenticated === false) {
                    setPlatformError((prev) => ({ ...prev, ibkr: 'Login through IBKR client portal gateway to proceed.' }))
                }
            } else {
                let resErr = arrayString(res);
                setPlatformError((prev) => ({ ...prev, ibkr: resErr.message }))
            }
        })
    }
    const openFullWidthWindow = (url: string) => {
        if (!url) {
            return <></>
        }
        const fullWidth = window.screen.availWidth; // Get the available screen width
        const fullHeight = window.screen.availHeight; // Get the available screen height

        // Open a new window with the full width and height
        window.open(
            url, // Replace with the desired URL
            "_blank",
            `width=${fullWidth},height=${fullHeight},top=0,left=0,scrollbars=yes`
        );
    };
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
    
        if (isRefreshIbkr) {
            interval = setInterval(() => {
                if (!platform.ibkr) {
                    setIsLoading(true);
                    getIbkrConnected();
                } else {
                    clearInterval(interval!);
                }
            }, 2000);
        }
    
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRefreshIbkr, platform.ibkr]);
    const linkIbkrAccount = () => {
        setIsRefreshIbkr(true)
        openFullWidthWindow('https://client.fntx.ai/sso/Login?forwardTo=22&RL=1&ip2loc=US')
    }
    console.log(platform.ibkr);
    return <BaseLayout>
        <section className="container onboarding">
            <h3 className="mb-0">Platform Requirements</h3>
            <div className="row pt-3">
                <div className="col-md-6 col-12 col-lg-4 mb-3 mt-4">
                    <Card>
                        <div>
                            <Alert type='danger' label={platformError?.ibkr} />
                            <div className="d-flex align-items-center justify-content-between">
                                <IBKRMarginIco />
                                {
                                    isLoading ?
                                        <LoaderSpin />
                                        :
                                        isRefreshIbkr ?null: platform.ibkr && <img src={TickIco} alt='refresh' />
                                }
                            </div>
                            <h6>IBKR Margin Account</h6>
                            <p className="mt-2">An IBKR margin account is required before accessing the platform.</p>
                        </div>
                        {isLoading === false ? isRefreshIbkr ? null : platform.ibkr ? <CardLinkConfirm message='IBKR Account Connected' /> : <div className="d-flex mt-2">
                            <Button className="btn btn-primary w-100 me-2" onClick={linkIbkrAccount}>Link Account</Button>
                            <Button type='button' className="btn btn-outline-primary w-100 ms-1" onClick={() => openFullWidthWindow('https://www.interactivebrokers.co.in/Universal/Application')}>Create Account</Button>
                        </div> : null}
                    </Card>
                </div>
                <div className="col-md-6 col-12 col-lg-4 mb-3 mt-4">
                    <Card>
                        <div>
                            <TradingIco />
                            <h6>Level 4 Options Trading</h6>
                            <p className="mt-2">Our strategy requires level 4 options trading approval in your account before accessing the platform.</p>
                        </div>
                        <div className="d-flex mt-2">
                            <Button className="btn btn-primary w-100 me-2">Check Level</Button>
                            <Button type='button' className="btn btn-outline-primary w-100 ms-1 d-flex align-items-center justify-content-center">Learn More <ArrowIco /> </Button>
                        </div>
                    </Card>
                </div>
                <div className="col-md-6 col-12 col-lg-4 mb-3 mt-4">
                    <Card>
                        <div>
                            <SubscriptionDataIco />
                            <h6>Options Data Subscription</h6>
                            <p className="mt-2">We require your account to have a subscription to options data, covering the SPY index, before accessing the platform.</p>
                        </div>
                        <div className="d-flex mt-2">
                            <Button className="btn btn-primary w-100 me-2">Contact IBKR</Button>
                            <Button type='button' className="btn btn-outline-primary w-100 ms-1 d-flex align-items-center justify-content-center">Learn More <ArrowIco /> </Button>
                        </div>
                    </Card>
                </div>
                <div className="col-md-6 col-12 col-lg-4 mb-3 mt-4">
                    <Card>
                        <div>
                            <WalletIntegrationIco />
                            <h6>DeFi Wallet Integration</h6>
                            <p className="mt-2">Connect a decentralised wallet to enable secure and efficient transactions on the platform.</p>
                        </div>
                        <div className="d-flex mt-2">
                            <Button className="btn btn-primary w-100 me-2">Connect Now</Button>
                            <Button type='button' className="btn btn-outline-primary w-100 ms-1 d-flex align-items-center justify-content-center">Learn More <ArrowIco /> </Button>
                        </div>
                    </Card>
                </div>
                <div className="col-md-6 col-12 col-lg-4 mb-3 mt-4">
                    <Card>
                        <div>
                            <NFTMarketplaceIco />
                            <h6 className="mt-3">NFT Access & Token Marketplace</h6>
                            <p className="mt-2">Access to the platform is token-gated by an NFT and requires the burning of utility tokens for select features.</p>
                        </div>
                        <div className="d-flex mt-2">
                            <Button className="btn btn-primary w-100 me-2">Token Marketplace</Button>
                            <Button type='button' className="btn btn-outline-primary w-100 ms-1 d-flex align-items-center justify-content-center">Learn More <ArrowIco /> </Button>
                        </div>
                    </Card>
                </div>
            </div>
            <h4 className="mt-4 mb-0 pb-5">Please ensure the following requirements are met.</h4>
            <div className="mt-5 d-flex justify-content-end mb-5 pt-3">
                <Button className="btn btn-primary me-1" disabled>Dashboard</Button>
            </div>
        </section>
    </BaseLayout>
}
interface Iprops {
    message: string
}
const CardLinkConfirm = ({ message }: Iprops) => {
    return <div className="d-flex align-items-center onboarding__confirm">
        <img src={TickDarkIco} className='tick me-2' />
        {message}
    </div>
}