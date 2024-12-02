import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../component/Card";
import Button from "../../component/form/button";
import BaseLayout from "../../layout/baseLayout";
import { platformList } from "../../lib/dummyArray";

export default function OnBoarding() {
    const navigate = useNavigate()
    useEffect(()=>{
    },[])
    
    return <BaseLayout>
        <section className="container onboarding mt-5">
            <h3>Platform Requirements</h3>
            <div className="row mt-5">
                {
                    platformList.map((items, index) => <div className="col-sm-6 col-12 col-lg-4 mb-3" key={index}>
                        <Card>
                            <div>
                                <h6>{items.title}</h6>
                                <p className="mt-2">{items.des}</p>
                            </div>
                            <div className="d-flex mt-2">
                                <Button className="btn btn-primary w-100 me-1">{items.btnTextDark}</Button>
                                <Button type='button' className="btn btn-outline-primary w-100 ms-1" onClick={() => navigate(items.url)}>{items.btnTextBorder}</Button>
                            </div>
                        </Card>
                    </div>)
                }
            </div>
            <h4>Please ensure the following requirements are met.</h4>
            <div className="mt-5 d-flex justify-content-end mb-5">
                <Button className="btn btn-primary me-1">Dashboard</Button>
            </div>
        </section>
    </BaseLayout>
}