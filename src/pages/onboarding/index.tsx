import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fetch from "../../common/api/fetch";
import Card from "../../component/Card";
import Button from "../../component/form/button";
import BaseLayout from "../../layout/baseLayout";
import { IBKRMarginIco, NFTMarketplaceIco, SubscriptionDataIco, TradingIco, WalletIntegrationIco,ArrowIco } from "../../lib/icons";
import { arrayString } from "../../lib/utilits";
import TickDarkIco from "@assets/svg/tick-dark.svg"
import ArrowRightIco from "@assets/svg/arrow-right.svg"
import Alert from "../../component/Alert";

export default function OnBoarding() {
    const navigate = useNavigate()
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
        const params = localStorage.user ? JSON.parse(localStorage.user) : {}
        setPlatform({
            active_subscription: params.active_subscription,
            ibkr: params.ibkr_authentication,
            metamask_address: params.metamask_address,
        })
    }, [])
    const linkIBKRAcc = () => {
        Fetch('ibkr/auth-status/').then((res: any) => {
            if (res.status) {
                if (res?.data?.authenticated) {
                    setPlatform((prev) => ({ ...prev, ibkr: res?.data?.authenticated }))
                } else {
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
    return <BaseLayout>
        <section className="container onboarding">
            <h3 className="mb-0">Platform Requirements</h3>
            <div className="row pt-3">
                <div className="col-md-6 col-12 col-lg-4 mb-3 mt-4">
                    <Card>
                        <div>
                            <Alert type='danger' label={platformError?.ibkr} />
                            <IBKRMarginIco />
                            <h6>IBKR Margin Account</h6>
                            <p className="mt-2">An IBKR margin account is required before accessing the platform.</p>
                        </div>
                        {platform.ibkr ? <CardLinkConfirm message='IBKR Account Connected' /> : <div className="d-flex mt-2">
                            <Button className="btn btn-primary w-100 me-2" onClick={linkIBKRAcc}>Link Account</Button>
                            <Button type='button' className="btn btn-outline-primary w-100 ms-1" onClick={() => openFullWidthWindow('https://www.interactivebrokers.co.in/Universal/Application')}>Create Account</Button>
                        </div>}
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
                            <Button type='button' className="btn btn-outline-primary w-100 ms-1 d-flex align-items-center justify-content-center">Learn More <ArrowIco/> </Button>
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
                            <Button type='button' className="btn btn-outline-primary w-100 ms-1 d-flex align-items-center justify-content-center">Learn More <ArrowIco/> </Button>
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
                            <Button type='button' className="btn btn-outline-primary w-100 ms-1 d-flex align-items-center justify-content-center">Learn More <ArrowIco/> </Button>
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
                            <Button type='button' className="btn btn-outline-primary w-100 ms-1 d-flex align-items-center justify-content-center">Learn More <ArrowIco/> </Button>
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