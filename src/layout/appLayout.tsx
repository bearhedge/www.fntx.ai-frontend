import { ReactNode } from "react";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
const sidbarWidth = 290
interface Iprops {
    children: ReactNode
}
export default function AppLayout({ children }: Iprops) {
    return <div className="main">
        <Sidebar width={sidbarWidth}/>
        <div className="main__wrapper" style={{marginLeft:sidbarWidth+'px',width: `calc(100% - ${sidbarWidth}px)`}}>
            <Header />
            <div className="main__wrapper__content">
                {children}
            </div>
        </div>
    </div>
}