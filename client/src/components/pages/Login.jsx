import React, { useState, useEffect } from 'react';
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

  // ✅ Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  // ✅ Fix manual login
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(apis().loginUser, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      if (!response.ok || !result.token) {
        throw new Error(result.message || 'Login failed');
      }

      toast.success(result.message || 'Login successful');
      localStorage.setItem('token', result.token);

      // ✅ Ensure all necessary user data is stored
      const userData = {
        id: result.userData?.id || '',
        email: result.userData?.email || email,
        name: result.userData?.name || 'User',
        role: result.userData?.role || 'User',
        photoURL: result.userData?.photoURL || 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      setEmail('');
      setPassword('');
      navigate('/profile'); // ✅ Redirect to profile
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fix Google login
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        id: user.uid,
        email: user.email,
        name: user.displayName || 'Google User',
        photoURL: user.photoURL || 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'
      };

      const response = await fetch(apis().googleLogin, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Google sign-in failed');

      localStorage.setItem('token', data.token);
      toast.success("Login successful");

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      navigate('/profile');
    } catch (error) {
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
            <Input onChange={e => setEmail(e.target.value)} required type='email' placeholder='Enter your email' value={email} />
          </div>

          <div className='auth_item'>
            <label>Password*</label>
            <Input onChange={e => setPassword(e.target.value)} required type='password' placeholder='Enter your password' value={password} />
          </div>

          <div className="auth_action">
            <Button disabled={loading} type="submit">
              <LoadingButton loading={loading} title={loading ? 'Logging in...' : 'Login'} />
            </Button>

            <div className="auth_options">
              <Link to='/register'>Create a new account?</Link>
              <Link to='/forgotPassword'>Forgot password?</Link>
            </div>
          </div>

          <Button onClick={googleLogin} disabled={loading} type="button" className="google_button">
            <FcGoogle />
            <span>Continue with Google</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
