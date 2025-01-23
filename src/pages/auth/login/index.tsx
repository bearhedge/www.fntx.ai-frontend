import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormC } from "../../../common/api/validation";
import Button from "../../../component/form/button";
import Input from "../../../component/form/input";
import AuthLayout from "../../../layout/authLayout";
// import SocialGoogle from '@assets/svg/social_google.svg'
import Fetch from "../../../common/api/fetch";
import { arrayString } from "../../../lib/utilits";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../../../services/slices/authSlice";
import AuthInstance from "../../../common/api/Auth";
export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const onSubmit = () => {
        setIsLoading(true)
        Fetch('login/', state, { method: 'post' }).then((res: any) => {
            if (res.status) {
                const { access, user } = res.data
                AuthInstance.setToken(access)
                localStorage.token = access
                localStorage.user = JSON.stringify(user)
                localStorage.onboarding = !(user.active_subscription && user.metamask_address && user.ibkr_authentication)
                dispatch(setLoginUser(true))
                setTimeout(()=>{
                    navigate('/onboarding')
                },500)
            } else {
                let resErr = arrayString(res);
                handleNewError(resErr);
            }
            setIsLoading(false)
        })
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const param:any = {...state}
    if(param.password?.length){
        delete param.password
    }
    const { errors, handleSubmit, handleNewError } = FormC({
        values: param,
        onSubmit,
    });
    return <AuthLayout>
        <div className="auth-form">
            <h3 className="mb-4">Sign-in</h3>
            <form onSubmit={handleSubmit}>
                <Input
                    errorText={errors.email}
                    onChange={onChange}
                    label='Email'
                    placeholder='email@company.com'
                    name='email'
                    type='text'
                />
                <Input
                    onChange={onChange}
                    errorText={errors.password || errors.error}
                    placeholder='******'
                    name='password'
                    label='Password'
                    type='password'
                />
                <div className="auth-link text-end">
                    <Link to='/forgot-password'>Forgot password</Link>
                </div>
                <Button isLoading={isLoading} disabled={isLoading} type="submit" className="btn btn-primary w-100 mt-4">Sign-in</Button>
            </form>
            <hr />
            <p className="have-account text-center mt-4 mb-0">Don't have an account? <Link to='/register'>Sign-up</Link></p>
        </div>
    </AuthLayout>
}