import { ReactNode, useEffect, useRef, useState } from "react";
import Logo from '@assets/svg/logo.svg';
import AuthImgOne from '@assets/images/auth-img.png';
import AuthImgSecond from '@assets/images/auth-img-1.png';
import AuthImgThrid from '@assets/images/auth-img-2.png';
import Slider from "react-slick";
import { Link } from "react-router-dom";

interface Iprops {
    children: ReactNode
}
const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
export default function AuthLayout({ children}: Iprops) {
    const colRef = useRef<HTMLDivElement>(null); // Create a ref for the column
    const [colHeight, setColHeight] = useState<number | null>(null); // State to store the height

    useEffect(() => {
        if (colRef.current) {
            setColHeight(colRef.current.offsetHeight); // Get the height of the column
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [colRef.current]);

    // Optional: Add a resize event listener to update the height on window resize
    const handleResize = () => {
        if (colRef.current) {
            setColHeight(colRef.current.offsetHeight);
        }
    };
    return <div className="row auth align-items-center m-0">
        <div className="col-md-5 col-12" ref={colRef}>
            <div className="text-center mb-5">
                <Link to='/'>
                <img src={Logo} alt='logo' className="auth-logo" />
                </Link>
            </div>
            {children}
        </div>
        <div className="col-md-7 d-none d-md-block p-0" >
            <Slider {...settings}>
                <div>
                    <img src={AuthImgOne} alt='logo' className="auth-banner img-fluid" style={{ height: colHeight + 'px' }} />
                </div>
                <div>
                    <img src={AuthImgSecond} alt='logo' className="auth-banner img-fluid" style={{ height: colHeight + 'px' }} />
                </div>
                <div>
                    <img src={AuthImgThrid} alt='logo' className="auth-banner img-fluid" style={{ height: colHeight + 'px' }} />
                </div>
            </Slider>
        </div>
    </div>
}