import BaseLayout from "../layout/baseLayout";
import HomeHero from "@assets/images/home-banner.png"
import { Link } from "react-router-dom";
import { RootState } from "../services/store";
import { useSelector } from "react-redux";
export default function Home() {
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);

    return <BaseLayout>
        <div className="home container">
            <div className="row">
                <div className="col-md-6 mb-4 mmb-md-0">
                    <h1 className="mb-0">Systematic Options Trading</h1>
                    <p className="py-4">Applying a process-driven framework to generate stable risk-adjusted returns.</p>
                    {!isLogin ? <Link to='/register' className="btn btn-primary btn-baselay">Register</Link>:<Link to='/onboarding' className="btn btn-primary btn-baselay">Platform Requirement</Link>}
                </div>
                <div className="col-md-6 text-right">
                    <img src={HomeHero} className='img-fluid'/>
                </div>
            </div>
        </div>
    </BaseLayout>
}