import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormC } from "../../../common/api/validation";
import Button from "../../../component/form/button";
import Input from "../../../component/form/input";
import AuthLayout from "../../../layout/authLayout";
// import SocialGoogle from '@assets/svg/social_google.svg'
import Confirmation from "../../../component/confirmationMessage";
import Fetch from "../../../common/api/fetch";
import { arrayString, onKeyPress } from "../../../lib/utilits";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [isSubmit, setIsSubmit] = useState(false)
    const [state, setState] = useState({
        email: '',
        password: '',
        username: '',
        verify_password: ''
    })
    const onSubmit = () => {
        setIsLoading(true)
        let params: any = { ...state }
        delete params.verify_password
        Fetch('signup/', params, { method: 'post' }).then((res: any) => {
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
                        className='signup__confirm'
                        onHandleConfirm={() => navigate('/onboarding')}
                        btnText='Continue'
                        title='Registration completed!'
                        para1='Your account has been successfully created.'
                        para2='Welcome to fntx.ai, a platform focused on developing effective and modular options trading systems. You may now explore our platform.'
                    />
                    :
                    <>
                        <h3 className="mb-4">Sign-up</h3>
                        <form onSubmit={handleSubmit}>
                            <Input
                                errorText={errors.username}
                                onChange={onChange}
                                onKeyPress={(evt: React.KeyboardEvent<HTMLInputElement>) => onKeyPress(evt, /^[^\s]+$/)}
                                onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
                                    event.preventDefault();
                                    const text = event.clipboardData.getData('text');
                                    const noSpaceText = text.replace(/\s+/g, '');
                                    setState({
                                        ...state,
                                        username: noSpaceText,
                                    });
                                }}
                                value={state.username}
                                label='Username'
                                placeholder='Username'
                                name='username'
                                type='text'
                            />
                            <Input
                                errorText={errors.email}
                                onChange={onChange}
                                placeholder='email@example.com'
                                label='Email'
                                name='email'
                                type='text'
                            />
                            <Input
                                onChange={onChange}
                                placeholder='******'
                                errorText={errors.password}
                                name='password'
                                label='Password'
                                type='password'
                            />
                            <Input
                                onChange={onChange}
                                placeholder='******'
                                errorText={errors.verify_password || errors.error}
                                name='verify_password'
                                label='Verify Password'
                                type='password'
                            />
                            <Button isLoading={isLoading} disabled={isLoading} type="submit" className="btn btn-primary w-100 mt-2">Sign-up</Button>
                        </form>
                        {/* <p className="have-account text-left mt-4 mb-0">By signing up, you agree to our <Link to='/register'>Terms & Conditions.</Link></p> */}
                        <hr />
                        {/* <Button type="submit" className="auth-google w-100 text-center d-flex align-items-center justify-content-center"><img src={SocialGoogle} alt='google' className="me-2" width={24} height={24} />Sign-in with Google</Button> */}
                        <p className="have-account text-center mt-4 mb-0">Already have an account? <Link to='/signin'>Sign-in</Link></p>
                    </>
            }
        </div>

    </AuthLayout>
}