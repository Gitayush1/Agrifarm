import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { BackTOlogin } from '../ui/BackTOlogin';
import { MdOutlineAttachEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import apis from '../../utils/apis';
import { LoadingButton } from '../ui/LoadingButton';
import './auth.css';

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const emailChange = (event) => {
        setEmail(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const response = await fetch(apis().forgetUser, {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json();
            setLoading(false);

            if (!response.ok) {
                if (response.status === 400 && result?.message) {
                    toast.error(result.message, { position: 'top-right' });
                } else {
                    throw new Error(result?.message || "Request failed");
                }
            } else if (result?.status) {
                toast.success(result?.message || "Request successful", { position: 'top-right' });
                navigate('/OTP');
                console.log("Email sent:", result.message);
                console.log("Token:", result.token);
                localStorage.setItem('PassToken', result.token);
                localStorage.setItem('email',email);

            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message, { position: 'top-right' });
        }
    };

    return (
        <div className="auth_main">
            <form onSubmit={submitHandler}>
                <div className="auth_container">
                    <div className="auth_header">
                        <MdOutlineAttachEmail />
                        <p className="auth_heading">Forget your password</p>
                        <p className="auth_title">Enter a registered email; we will send a 6-digit OTP</p>
                    </div>
                    <div className="auth_item">
                        <label>Email*</label>
                        <Input onChange={emailChange} required placeholder="Enter your email" type="email" />
                    </div>
                    <div className="auth_action">
                        <Button>
                            <LoadingButton loading={loading} title="Send OTP" />
                        </Button>
                    </div>
                    <div>
                        <BackTOlogin />
                    </div>
                </div>
            </form>
        </div>
    );
};
