import { AiLabIco, DashboardIco, HomeIco, OptionStremIco, SystemIco } from './icons'
export const menu = [
    {
        label: 'Home',
        route: '/home',
        ico: <HomeIco />
    },
    {
        label: 'Dashboard',
        route: '/dashboard',
        ico: <DashboardIco />
    },
    {
        label: 'System',
        ico: <SystemIco />,
        chiildren:[
            {
                label: 'Ticker',
                route: '/system?id=0',
            },
            {
                label: 'Timing',
                route: '/system?id=1',
            },
            {
                label: 'Range',
                route: '/system?id=2',
            },
            {
                label: 'Risk',
                route: '/system?id=3',
            },
            {
                label: 'Contracts',
                route: '/system?id=4',
            },
            {
                label: 'Execute',
                route: '/system?id=5',
            },
            {
                label: 'Manage',
                route: '/system?id=6',
            },
        ]
    },
    {
        label: 'AI Lab',
        route: '/ai-lap',
        ico: <AiLabIco />
    },
    {
        label: 'OptionStream',
        route: '/optionstream',
        ico: <OptionStremIco />
    }
]