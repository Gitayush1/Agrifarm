import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { BackTOlogin } from '../ui/BackTOlogin';
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apis from '../../utils/apis';
import { LoadingButton } from '../ui/LoadingButton';

export const UpdatePassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    const confirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();

        if (trimmedPassword !== trimmedConfirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        // Retrieve the token from localStorage
        const token = localStorage.getItem('PassToken');

        if (!token) {
            toast.error('Token is missing');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(apis().updateUser, {
                method: 'POST',
                body: JSON.stringify({ password: trimmedPassword, confirmPassword: trimmedConfirmPassword, token }),
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json();
            setLoading(false);

            if (!response.ok) {
                if (response.status === 400 && result?.message) {
                    toast.error(result.message);
                } else {
                    throw new Error(result?.message || "Password update failed");
                }
            } else if (result?.status) {
                toast.success(result?.message || "Password updated successfully");
                navigate('/login');
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <div className="auth_main">
            <form onSubmit={submitHandler}>
                <div className="auth_container">
                    <div className="auth_header">
                        <GrUpdate />
                        <p className='auth_heading'>New Password</p>
                        <p className='auth_title'>Enter at least 6-digit long password</p>
                    </div>
                    <div className="auth_item">
                        <label>Password*</label>
                        <Input onChange={passwordChange} type="password" required placeholder="New password" />
                    </div>
                    <div className="auth_item">
                        <label>Confirm Password*</label>
                        <Input onChange={confirmPasswordChange} type="password" required placeholder="Confirm password" />
                    </div>
                    <div className="auth_action">
                        <Button>
                            <LoadingButton loading={loading} title="Update Password" />
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
