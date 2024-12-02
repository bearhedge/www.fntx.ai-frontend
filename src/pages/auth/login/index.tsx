import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormC } from "../../../common/api/validation";
import Button from "../../../component/form/button";
import Input from "../../../component/form/input";
import AuthLayout from "../../../layout/authLayout";
import SocialGoogle from '@assets/svg/social_google.svg'
import Fetch from "../../../common/api/fetch";
import { arrayString } from "../../../lib/utilits";
export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const onSubmit = () => {
        setIsLoading(true)
        Fetch('login/',state,{method:'post'}).then((res:any)=>{
            console.log(res);
            if(res.status){
                localStorage.token = res.data.token
                localStorage.onboarding = true
                navigate('/onboarding')
            }else{
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
    const { errors, handleSubmit, removeAllError, handleNewError } = FormC({
        values: state,
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
                    name='email'
                    type='text'
                />
                <Input
                    onChange={onChange}
                    errorText={errors.password || errors.message}
                    name='password'
                    label='Password'
                    type='password'
                />
                <div className="auth-link text-end">
                    <Link to='/forgot'>Forgot password</Link>
                </div>
                <Button isLoading={isLoading} disabled={isLoading} type="submit" className="btn btn-primary w-100 mt-4">Sign-in</Button>
            </form>
            <hr/>
            <Button type="button" className="auth-google w-100 text-center d-flex align-items-center justify-content-center"><img src={SocialGoogle} alt='google' className="me-2" width={24} height={24}/>Sign-in with Google</Button>
            <p className="have-account text-center mt-4 mb-0">Don't have an account? <Link to='/register'>Sign-up</Link></p>
        </div>
    </AuthLayout>
}