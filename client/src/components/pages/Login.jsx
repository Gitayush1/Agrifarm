import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosLogIn } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-hot-toast';
import apis from '../../utils/apis';
import { LoadingButton } from '../ui/LoadingButton';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";

export const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const emailChange = (event) => setEmail(event.target.value);
  const passwordChange = (event) => setPassword(event.target.value);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(apis().loginUser, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.warn("Unexpected non-JSON response:", text);
        throw new Error(`Unexpected response: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (!response.ok || !result.token) {
        throw new Error(result.message || 'Login failed: no token received');
      }

      toast.success(result.message || 'Login successful');
      localStorage.setItem('token', result.token);

      // Save the default profile picture in localStorage after email login
      localStorage.setItem('profilePic', 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg');

      // Update the user state with default image after successful email login
      setUser({ email, photoURL: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg' });

      // Clear email and password after successful login
      setEmail('');
      setPassword('');

      navigate('/dashboard');
    } catch (error) {
      console.error('Caught error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Capture email, displayName, and photoURL from Firebase user
      const email = user.email;
      const name = user.displayName;
      const photoURL = user.photoURL || 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'; // Fallback profile picture

      // Send email, name, and photoURL to backend
      const response = await fetch(apis().googleLogin, {
        method: 'POST',
        body: JSON.stringify({ email, name, photoURL }), // Pass photoURL
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Google sign-in failed');

      localStorage.setItem('token', data.token);
      toast.success("Login successful");

      // Update user state with the info fetched from Google sign-in
      setUser({ email, photoURL });

      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error(error.message || 'Google sign-in failed');
    }
  };

  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <IoIosLogIn />
            <p className='auth_heading'>Welcome back</p>
            <p className='auth_title'>Login to continue</p>
          </div>
          <div className='auth_item'>
            <label>Email*</label>
            <Input onChange={emailChange} required type='email' placeholder='Enter your email' value={email} />
          </div>

          <div className='auth_item'>
            <label>Password*</label>
            <Input onChange={passwordChange} required type='password' placeholder='Enter your password' value={password} />
          </div>

          <div className="auth_action">
            <Button disabled={loading} type="submit">
              <LoadingButton loading={loading} title={loading ? 'Logging in...' : 'Login'} />
            </Button>

            {/* OR Divider */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
              <span style={{ margin: '0 1rem', color: '#757575', fontSize: '14px' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
            </div>

            <Button onClick={googleLogin} disabled={loading} type="button" className="google_button">
              <FcGoogle style={{ color: 'white', fontSize: '20px', height: '24px', width: '24px' }} />
              <span style={{ marginLeft: '10px' }}>Continue with Google</span>
            </Button>
          </div>

          <div className="auth_options">
            <Link to='/register'>Create a new account?</Link>
            <Link to='/forgotPassword'>Forgot password?</Link>
          </div>
        </div>
      </form>
    </div>
  );
}; 