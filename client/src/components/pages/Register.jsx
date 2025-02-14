import React, { useState } from 'react';
import './auth.css';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { BackTOlogin } from '../ui/BackTOlogin';
import { FaFolderPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apis from '../../utils/apis';
import { LoadingButton } from '../ui/LoadingButton';

export const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const nameChange = (event) => {
        setName(event.target.value);
    };

    const emailChange = (event) => {
        setEmail(event.target.value);
    };

    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const response = await fetch(apis().registerUser, {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json();
            setLoading(false);
            
            if (!response.ok) {
                if (response.status === 400 && result?.message) {
                    toast.error(result.message);
                } else {
                    throw new Error(result?.message || "Registration failed");
                }
            } else if (result?.status) {
                toast.success(result?.message || "Registration successful");
                navigate('/login');
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <div className='auth_main'>
            <form onSubmit={submitHandler}>
                <div className="auth_container">
                    <div className="auth_header">
                        <FaFolderPlus />
                        <p className='auth_heading'>Welcome</p>
                        <p className='auth_title'>Create a new account</p>
                    </div>
                    <div className="auth_item">
                        <label>Name *</label>
                        <Input onChange={nameChange} type='text' required placeholder='Enter your name' />
                    </div>
                    <div className="auth_item">
                        <label>Email *</label>
                        <Input onChange={emailChange} type='email' required placeholder='Enter your email' />
                    </div>
                    <div className="auth_item">
                        <label>Password *</label>
                        <Input onChange={passwordChange} type='password' required placeholder='Enter your password' />
                    </div>
                    <div className="auth_action">
                        <Button>
                            <LoadingButton loading={loading} title='Register' />
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
