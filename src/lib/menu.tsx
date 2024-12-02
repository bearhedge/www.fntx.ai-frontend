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
        chiildren:[]
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