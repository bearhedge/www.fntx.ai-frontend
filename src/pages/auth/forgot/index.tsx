import { useState } from "react";
import AuthLayout from "../../../layout/authLayout";
import Input from "../../../component/form/input";
import Alert from "../../../component/Alert";
import Button from "../../../component/form/button";
import Fetch from "../../../common/api/fetch";
import { useNavigate } from "react-router-dom";
import { FormC } from "../../../common/api/validation";
import { arrayString } from "../../../lib/utilits";

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [state, setState] = useState({
        email: '',
    })
    
    const onSubmit = () => {
        setIsLoading(true)
        Fetch('accounts/send-otp/', state, { method: 'post' }).then((res: any) => {
            if (res.status) {
                setMessage('We have sent the OTP to you email please check.')
                setTimeout(() => {
                    setMessage('')
                    navigate('/reset-password', { state: state })
                }, 3000)
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
    const { errors, handleSubmit, handleNewError } = FormC({
        values: state,
        onSubmit,
    });
    return <AuthLayout>
        <div className="auth-form">
            <h3 className="mb-4">Forget Password</h3>
            <p className="mb-0">Please enter the email address associated with your account.</p>
            <form onSubmit={handleSubmit}>
                <div className="auth-form-inputs">
                    <Input
                        errorText={errors.email || errors.error}
                        onChange={onChange}
                        placeholder='email@example.com'
                        label='Email'
                        name='email'
                        type='text'
                    />
                </div>
                <Alert type="success" label={message} />
                <Button disabled={isLoading} isLoading={isLoading} type="submit" className="btn btn-primary w-100 mt-4">Send OTP</Button>
            </form>
        </div>
    </AuthLayout>
}