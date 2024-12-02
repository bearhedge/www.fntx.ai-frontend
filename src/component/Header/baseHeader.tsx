import { Link } from "react-router-dom";
import Logo from '@assets/svg/logo.svg';
export default function BaseHeader() {
    return <div className='header header-base'>
        <div className="container d-flex justify-content-between align-items-center">
            <Link to='/'>
                <img src={Logo} />
            </Link>
            <Link to='/login' className="btn btn-primary btn-baselay">Login</Link>
        </div>
    </div>
}