import React, { useState } from 'react';
import Countdown from 'react-countdown';
import apis from '../../utils/apis';
import toast from 'react-hot-toast';

export const Timer = () => {
    const initialDuration = 1 * 60 * 1000; // 1 minute in milliseconds
    const [endTime, setEndTime] = useState(Date.now() + initialDuration);

    const handleResendOtp = async () => {
        setEndTime(Date.now() + initialDuration); // Reset timer to 1 minute from now

        try {
            const response = await fetch(apis().forgetUser, {
                method: 'POST',
                body: JSON.stringify({ email: localStorage.getItem('email') }),
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.message);
            }

            if (result?.status) {
                console.log(result);
                localStorage.setItem('PassToken', result.token); // Store the new token in localStorage
                toast.success('OTP sent successfully!');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="timer">
            <Countdown
                key={endTime} // Adding key to re-render countdown on state change
                date={endTime}
                onComplete={() => {}}
                renderer={({ minutes, seconds, completed }) => (
                    completed ? (
                        <button onClick={handleResendOtp}>Resend OTP</button>
                    ) : (
                        <span>
                            Resend OTP in: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </span>
                    )
                )}
            />
        </div>
    );
};
