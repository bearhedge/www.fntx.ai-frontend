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
                label: 'Asset',
                route: '/system',
            },
            {
                label: 'Timing',
                route: '/system/1',
            },
            {
                label: 'Range',
                route: '/system/2',
            },
            {
                label: 'Risk',
                route: '/system/3',
            },
            {
                label: 'Contracts',
                route: '/system/4',
            },
            {
                label: 'Execute',
                route: '/system/5',
            },
            {
                label: 'Manage',
                route: '/system/6',
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