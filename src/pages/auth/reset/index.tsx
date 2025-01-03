import { useEffect, useState } from "react";
import AuthLayout from "../../../layout/authLayout";
import Input from "../../../component/form/input";
import Button from "../../../component/form/button";
import Fetch from "../../../common/api/fetch";
import { useLocation, useNavigate } from "react-router-dom";
import { FormC } from "../../../common/api/validation";
import Confirmation from "../../../component/confirmationMessage";
import { arrayString } from "../../../lib/utilits";

export default function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [state, setState] = useState({
        password: '',
        otp: '',
        email: '',
        verify_password: ''
    })
    useEffect(() => {
        if (location.state) {
            setState({
                ...state,
                email: location.state.email
            })
        }
    }, [location])
    const onSubmit = () => {
        setIsLoading(true)
        const params: any = { ...state }
        delete params.verify_password
        Fetch('accounts/reset-password/', params, { method: 'post' }).then((res: any) => {
            if (res.status) {
                setIsSubmit(true)
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
    const { errors, handleSubmit, handleNewError } = FormC({
        values: state,
        onSubmit,
    });
    return <AuthLayout>
        <div className="auth-form">
            {
                isSubmit ?
                    <Confirmation
                        title="Password Changed Successfully"
                        para1="Your password has been successfully updated!"
                        btnText='Continue to Login'
                        onHandleConfirm={() => navigate('/signin')}
                    />
                    :
                    <>
                        <h3 className="mb-4">Reset your password</h3>
                        <p className="mb-2">Please enter the OTP, Password, and Verify Password fields to reset your password.</p>
                        <form className="mt-4" onSubmit={handleSubmit}>
                            <Input
                                errorText={errors.otp}
                                onChange={onChange}
                                placeholder='******'
                                label='OTP'
                                name='otp'
                                type='text'
                            />
                            <Input
                                errorText={errors.password}
                                onChange={onChange}
                                placeholder='******'
                                label='Password'
                                name='password'
                                type='password'
                            />
                            <Input
                                errorText={errors.verify_password || errors.error}
                                onChange={onChange}
                                placeholder='******'
                                label='Verify Password'
                                name='verify_password'
                                type='password'
                            />
                            <Button disabled={isLoading} isLoading={isLoading} type="submit" className="btn btn-primary w-100 mt-4">Reset Password</Button>
                        </form>
                    </>
            }


        </div>

    </AuthLayout>
}