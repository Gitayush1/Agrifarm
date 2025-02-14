import React, { useRef, useEffect, useState } from 'react';
import './auth.css';
import { FaFingerprint } from "react-icons/fa";
import { Button } from '../ui/Button';
import { BackTOlogin } from '../ui/BackTOlogin';
import { Timer } from './Timer';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import apis from '../../utils/apis';
import { LoadingButton } from '../ui/LoadingButton';

export const VerifyOtp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Loading state

    // References for each input box
    const refs = Array.from({ length: 6 }, () => useRef(null));
    const [otp, setOtp] = useState(Array(6).fill('')); // State to hold each digit

    useEffect(() => {
        refs[0].current.focus(); // Auto-focus the first input on load
    }, []);

    // Handle changes in input boxes
    const inputChange = (event, index) => {
        const value = event.target.value;

        if (value) {
            // Set the OTP value for this index and move to the next input if there's a value
            setOtp(prev => {
                const updatedOtp = [...prev];
                updatedOtp[index] = value.slice(-1); // Only take the last digit entered
                return updatedOtp;
            });

            if (index < 5) {
                refs[index + 1].current.focus(); // Move focus to the next input
            }
        }
    };

    // Handle backspace key press to delete and move focus to previous input
    const handleBackspace = (event, index) => {
        if (event.key === 'Backspace') {
            if (otp[index] === '') {
                // Move focus to previous input if current is empty
                if (index > 0) {
                    refs[index - 1].current.focus();
                }
            } else {
                // Clear current input
                setOtp(prev => {
                    const updatedOtp = [...prev];
                    updatedOtp[index] = '';
                    return updatedOtp;
                });
            }
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const finalOtp = otp.join('');
        setLoading(true); // Start loading

        try {
            const response = await fetch(apis().verifyUser, {
                method: 'POST',
                body: JSON.stringify({ otp: finalOtp }),
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json();
            setLoading(false); // Stop loading after response

            if (!response.ok) {
                toast.error(result?.message || 'Invalid OTP');
                return;
            }

            if (result?.status) {
                toast.success(result?.message || 'OTP Verified Successfully');
                navigate('/updatepassword');
            }
        } catch (error) {
            setLoading(false); // Stop loading on error
            toast.error(error.message || 'An error occurred');
        }
    };

    return (
        <div className="auth_main">
            <form onSubmit={submitHandler}>
                <div className="auth_container">
                    <div className="auth_header">
                        <FaFingerprint />
                        <p className='auth_heading'>Verify your OTP</p>
                        <p className='auth_title'>Enter the 6-digit OTP we sent to your email</p>
                    </div>
                    <div className="auth_item">
                        <label>OTP*</label>
                        <div className='otp_input_container'>
                            {otp.map((_, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    className="ui_input otp_input"
                                    ref={refs[index]}
                                    value={otp[index]}
                                    onChange={(event) => inputChange(event, index)}
                                    onKeyDown={(event) => handleBackspace(event, index)}
                                    onInput={(event) => {
                                        if (event.target.value.length > 1) {
                                            event.target.value = event.target.value.slice(0, 1);
                                        }
                                    }}
                                    required
                                />
                            ))}
                        </div>
                    </div>
                    <div className='auth_action'>
                        <Button>
                            <LoadingButton loading={loading} title="Verify" />
                        </Button>
                    </div>
                    <div>
                        <Timer />
                    </div>
                    <div>
                        <BackTOlogin />
                    </div>
                </div>
            </form>
        </div>
    );
};
