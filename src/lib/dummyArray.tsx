import { IBKRMarginIco, IBKRTraderIco, TradingIco, SubscriptionDataIco, WalletIntegrationIco, NFTMarketplaceIco } from './icons'
export const platformList = [
    {
        ico: <IBKRMarginIco />,
        title: 'IBKR Margin Account',
        btnTextDark: 'Link Account',
        btnTextBorder: 'Create Account',
        des: 'An IBKR margin account is required before accessing the platform.',
        url: '',
        type: 'ibkr-margin'
    },
    {
        ico: <IBKRTraderIco />,
        title: 'IBKR Trader Workstation',
        btnTextDark: 'Download TWS',
        btnTextBorder: 'Open TWS',
        des: 'A running instance of TWS, logged in with your margin account, is required when accessing the platform.',
        url: '',
        type: 'ibkr-trader'
    },
    {
        ico: <TradingIco />,
        title: 'Level 4 Options Trading',
        btnTextDark: 'Check Level',
        btnTextBorder: 'Learn More',
        des: 'Our strategy requires level 4 options trading approval in your account before accessing the platform.',
        url: '',
        type: 'trading'
    },
    {
        ico: <SubscriptionDataIco />,
        title: 'Options Data Subscription',
        btnTextDark: 'Contact IBKR',
        btnTextBorder: 'Learn More',
        des: 'We require your account to have a subscription to options data, covering the SPY index, before accessing the platform.',
        url: '',
        type: 'subscription-data'
    },
    {
        ico: <WalletIntegrationIco />,
        title: 'DeFi Wallet Integration',
        btnTextDark: 'Connect Now',
        btnTextBorder: 'Learn More',
        des: 'Connect a decentralised wallet to enable secure and efficient transactions on the platform.',
        url: '',
        type: 'wallet-integration'
    },

    {
        ico: <NFTMarketplaceIco />,
        title: 'NFT Access & Token Marketplace',
        btnTextDark: 'Token Marketplace',
        btnTextBorder: 'Learn More',
        des: 'Access to the platform is token-gated by an NFT and requires the burning of utility tokens for select features.',
        url: '',
        type: 'nft-marketplace'
    },

]
export const systemtab = [
    'Ticker',
    'Timing',
    'Range',
    'Risk',
    'Contracts',
    'Trade',
    'Manage'
]