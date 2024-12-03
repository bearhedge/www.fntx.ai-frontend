import { Link, useNavigate } from "react-router-dom";
import Logo from '@assets/svg/logo.svg';
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import Button from "../form/button";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../../services/slices/authSlice";
export default function BaseHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const handleLogout = () => {
        localStorage.clear();
        dispatch(setLoginUser(false))
        navigate('/')
    }
    return <div className='header header-base'>
        <div className="container d-flex justify-content-between align-items-center">
            <Link to='/'>
                <img src={Logo} />
            </Link>
            {!isLogin ? <Link to='/signin' className="btn btn-primary btn-baselay">Login</Link> : <Button className="btn btn-primary btn-baselay" onClick={handleLogout}>Logout</Button>}
        </div>
    </div>
}