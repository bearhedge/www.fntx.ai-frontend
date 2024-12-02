import { ReactNode } from "react";
import Footer from "../component/Footer";
import BaseHeader from "../component/Header/baseHeader";
interface Iprops {
    children: ReactNode
}

export default function BaseLayout({ children }: Iprops) {
    return <>
        <BaseHeader/>
        <div className="main__wrapper">
            {children}
        </div>
        <Footer/>
    </>
}