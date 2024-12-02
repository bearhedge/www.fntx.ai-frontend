import Button from "../component/form/button";
import BaseLayout from "../layout/baseLayout";
import HomeHero from "@assets/images/home-banner.png"
import { Link } from "react-router-dom";
export default function Home() {
    return <BaseLayout>
        <div className="home container">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6 mb-4 mmb-md-0">
                    <h1>Systematic Options Trading</h1>
                    <p className="py-4">Applying a process-driven framework, intergrated with machine learning to generate superior risk-adjusted returns with discipline and consistency</p>
                    <Link to='/register' className="btn btn-primary btn-baselay">Register</Link>
                </div>
                <div className="col-md-6 text-right">
                    <img src={HomeHero} className='img-fluid'/>
                </div>
            </div>
        </div>
    </BaseLayout>
}