import { useEffect, useState } from "react";
import Fetch from "../../common/api/fetch";
import Card from "../../component/Card";
import Button from "../../component/form/button";
import BaseLayout from "../../layout/baseLayout";
import { IBKRMarginIco, SubscriptionDataIco, TradingIco, WalletIntegrationIco, ArrowIco, TickGreenIcon } from "../../lib/icons";
import { arrayString, connectMetaMask } from "../../lib/utilits";
import TickDarkIco from "@assets/svg/tick-dark.svg"
import Alert from "../../component/Alert";
import LoaderSpin from "../../component/loader";
import DialogConfirm from "../../component/modal";
import { useNavigate } from "react-router-dom";
let modalContent: any = {
    1: {
        title: 'Interactive Brokers Account not connected',
        des: 'Unable to detect a connected IBKR account. Please log in and try again.'
    },
    2: {
        title: 'Connect Your DeFi Wallet with MetaMask',
        des: "To securely link your DeFi wallet, you'll need the MetaMask extension. It's a quick and easy way to enhance your connection.",
        des1: 'After installing MetaMask, refresh the page to enable full functionality.'
    },
    3: {
        title: '',
        des: ''
    }
}
export default function OnBoarding() {
    const navigate = useNavigate()
    const [isRefreshIbkr, setIsRefreshIbkr] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingMeta, setIsLoadingMeta] = useState(true)
    const [isRefreshMeta, setIsRefreshMeta] = useState(false)
    const [isOpen, setIsOpen] = useState(0)
    const [isOneTimeModal, setIsOneTimeModal] = useState(false)
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

    const [platform, setPlatform] = useState({
        ibkr: false,
        id: '',
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
                    id: res.data?.id,
                    ibkr: res.data?.authenticated ? true : false,
                    active_subscription: res.data?.active_subscription,
                    metamask_address: res.data?.metamask_address ? true : false
                }))
            }
            setIsLoadingMeta(false)
            setIsRefreshIbkr(false)
            setIsRefreshMeta(false)
        })
    }
    const getIbkrConnected = () => {
        if (platform.ibkr) {
            return;
        }
        Fetch('ibkr/auth-status/').then((res: any) => {
            if (res.status) {
                if (res?.data?.authenticated) {
                    setPlatform((prev) => ({ ...prev, ibkr: res?.data?.authenticated }))
                    setPlatformError((prev) => ({ ...prev, ibkr: '' }))
                    setIsLoading(false)
                    setIsRefreshIbkr(false)
                    setIsOpen(0)
                } else if (res?.data?.authenticated === false) {
                    setIsOpen(1)
                    // setPlatformError((prev) => ({ ...prev, ibkr: 'Login through IBKR client portal gateway to proceed.' }))
                }
            } else {
                let resErr = arrayString(res);
                if (resErr.message && isOneTimeModal) {
                    modalContent[1].des = resErr.message
                    setIsOpen(1)
                } else {
                    // setIsOneTimeModal(false)
                }
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
        setIsOneTimeModal(true)
        setIsRefreshIbkr(true)
        openFullWidthWindow('https://client.fntx.ai/sso/Login?forwardTo=22&RL=1&ip2loc=US')
    }
    const addMetaMask = (id: string) => {
        setIsLoadingMeta(true);
        Fetch(`ibkr/onboarding/${platform.id}/`, { metamask_address: id }, { method: 'patch' }).then(res => {
            if (res.status) {
                setPlatform((prev) => ({ ...prev, metamask_address: true }))
                setIsLoadingMeta(false)
                setIsRefreshMeta(false)
            } else {
                let resErr = arrayString(res);
                if (resErr.message) {
                    modalContent[3].des = resErr.message
                    setIsOpen(3)
                }
            }
        })
    }
    const handleConnectWallet = async () => {
        try {
            const account = await connectMetaMask();
            setIsRefreshMeta(true)
            if (account?.account) {
                setIsRefreshMeta(true)
                addMetaMask(account?.account)
            } else {
                setIsRefreshMeta(false)
                setIsOneTimeModal(true)
                setIsOpen(2)
            }
        } catch (error) {
            console.error("Failed to connect:", error);
        }
    }
    useEffect(() => {
        const ethereum = (window as any).ethereum;
        if (ethereum) {
            ethereum?.request({ method: 'eth_requestAccounts' })
                .then((accounts: any) => {
                    if (accounts.length > 0) {
                        setIsMetaMaskInstalled(false);
                        if(!platform?.metamask_address && platform.id){
                            addMetaMask(accounts[0])
                        }
                    } else {
                        modalContent[2].des = 'After installing MetaMask, connect the metamask and refresh the page to enable full functionality.'
                        modalContent[2].des1 = ''
                        setIsMetaMaskInstalled(true);
                    }
                })
                .catch(() => {
                    setIsMetaMaskInstalled(true);
                });
            // Listen for account changes
            const handleAccountsChanged = (accounts: any) => {
                if (accounts.length === 0) {
                    console.log("Please connect to MetaMask.");
                } else {
                    addMetaMask(accounts[0])
                }
            };
            ethereum.on("accountsChanged", handleAccountsChanged);
        } else {
            setIsMetaMaskInstalled(true);
        }
    }, [platform?.metamask_address , platform.id]);
    // useEffect(() => {
    //     const ethereum = (window as any).ethereum;
    //     // Function to handle account changes
    //     const handleAccountsChanged = (accounts:any) => {
    //         if (accounts.length === 0) {
    //             console.log("Please connect to MetaMask");
    //         } else {
    //             console.log("Account changed to:", accounts[0]);
    //         }
    //     };

    //     // Get the initial account
    //     ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch(console.error);

    //     // Listen for account changes
    //     ethereum.on('chainChanged', handleAccountsChanged);

    //     // Cleanup listener on unmount
    //     return () => {
    //         ethereum.removeListener('accountsChanged', handleAccountsChanged);
    //     };
    // }, [])
    const handleClose = () => {
        setIsOneTimeModal(false)
        setIsOpen(0)
    }

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
                                        isRefreshIbkr ? null : platform.ibkr && <TickGreenIcon className={'onboarding-confirm-tick'} />
                                }
                            </div>
                            <h6>Interactive Brokers (IBKR) Margin Account</h6>
                            <p className="mt-2">Set-up and connect an IBKR margin account to access the platform and start trading.</p>
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
                            <div className="d-flex align-items-center justify-content-between">
                                <WalletIntegrationIco />
                                {
                                    isLoadingMeta ?
                                        <LoaderSpin />
                                        :
                                        isRefreshMeta ? null : platform.metamask_address && !isMetaMaskInstalled && <TickGreenIcon className={'onboarding-confirm-tick'} />
                                }
                            </div>
                            <h6>DeFi Wallet Integration</h6>
                            <p className="mt-2">Connect a MetaMask wallet to enable secure, blockchain-based access to the platform.</p>
                        </div>
                        {isLoadingMeta === false ? isRefreshMeta ? null : platform.metamask_address && !isMetaMaskInstalled ? <CardLinkConfirm message='DeFi Wallet Connected' /> : <div className="d-flex mt-2">
                            <Button className="btn btn-primary w-100 me-2" onClick={handleConnectWallet}>Connect Now</Button>
                            <Button type='button' className="btn btn-outline-primary w-100 ms-1 d-flex align-items-center justify-content-center" onClick={() => openFullWidthWindow('https://metamask.io/download/')}>Learn More <ArrowIco /> </Button>
                        </div> : null}
                    </Card>
                </div>
                <div className="col-md-6 col-12 col-lg-4 mb-3 mt-4">
                    <Card>
                        <div>
                            <TradingIco />
                            <h6>Level 4 Options Trading Approval</h6>
                            <p className="mt-2">Obtain level 4 approval through trading permissions in your IBKR settings to access and implement the platform’s systematic options strategies.</p>
                        </div>
                        {/* <div className="d-flex mt-2">
                            <Button className="btn btn-primary w-100 me-2">Check Level</Button>
                            <Button type='button' className="btn btn-outline-primary w-100 ms-1 d-flex align-items-center justify-content-center">Learn More <ArrowIco /> </Button>
                        </div> */}
                    </Card>
                </div>
                <div className="col-md-6 col-12 col-lg-4 mb-3 mt-4">
                    <Card>
                        <div>
                            <SubscriptionDataIco />
                            <h6>Options Price Reporting Authority (OPRA) <br></br> Level I</h6>
                            <p className="mt-2">Subscribe to OPRA Level I data through data subscriptions in your IBKR settings to activate real-time data streaming on the platform.</p>
                        </div>
                        {/* <div className="d-flex mt-2">
                            <Button className="btn btn-primary w-100 me-2">Contact IBKR</Button>
                            <Button type='button' className="btn btn-outline-primary w-100 ms-1 d-flex align-items-center justify-content-center">Learn More <ArrowIco /> </Button>
                        </div> */}
                    </Card>
                </div>

                {/* <div className="col-md-6 col-12 col-lg-4 mb-3 mt-4">
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
                </div> */}
            </div>
            <h4 className="mt-4 mb-0 pb-5">Please ensure the following requirements are met.</h4>
            <div className="mt-5 d-flex justify-content-end mb-5 pt-3">
                <Button className="btn btn-primary btn-baselay me-1" onClick={()=>navigate('/dashboard')} disabled={!(platform?.ibkr && (platform?.metamask_address && !isMetaMaskInstalled))}>Dashboard</Button>
            </div>
        </section>
        <DialogConfirm isOpen={isOpen} title={modalContent[isOpen]?.title} des={modalContent[isOpen]?.des} des1={modalContent[isOpen]?.des1} onClose={handleClose}>
            <div className="d-flex align-items-center mt-4">
                {
                    isOpen === 1 ?
                        <>
                            <Button type='button' className="btn  w-100 me-1" onClick={() => openFullWidthWindow('https://www.interactivebrokers.co.in/Universal/Application')}>Create Account</Button>
                            <Button className="btn btn-primary w-100 me-2" onClick={linkIbkrAccount}>Link IBKR Account</Button>
                        </>
                        : isOpen === 2 ? <>
                            <Button type='button' className="btn w-100 me-1 d-flex align-items-center justify-content-center" onClick={handleClose}>Install Later</Button>
                            <Button className="btn btn-primary w-100 me-2" onClick={() => openFullWidthWindow('https://metamask.io/download/')}>Install Now</Button>
                        </> : null
                }
            </div>
        </DialogConfirm>
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