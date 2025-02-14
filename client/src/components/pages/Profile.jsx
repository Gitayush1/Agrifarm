import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { LoadingButton } from '../ui/LoadingButton';
import { toast } from 'react-hot-toast';
import apis from '../../utils/apis';
import { Signout } from '../ui/Signout';

export const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(apis().updateProfile, {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast.error(result.message || "Failed to update profile");
      } else if (result.status) {
        toast.success(result.message || "User updated Successfully");
        navigate('/login');
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred during the update process: " + error.message);
    }
  };

  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <img
              src={photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="auth_heading">Profile</h2>
          </div>

          <div className="auth_item">
            <label>Name *</label>
            <Input onChange={e => setName(e.target.value)} value={name} type='text' required placeholder='Enter your name' />
          </div>

          <div className="auth_item">
            <label>Email *</label>
            <Input onChange={e => setEmail(e.target.value)} value={email} type='email' required placeholder='Enter your email' />
          </div>

          <div className="auth_item">
            <label>Password *</label>
            <Input onChange={e => setPassword(e.target.value)} value={password} type='password' required placeholder='Enter your password' />
          </div>

          <div className="auth_action">
            <Button>
              <LoadingButton loading={loading} title='Update' />
            </Button>
          </div>

         <div onClick={handleSignOut}>
          <Signout/>
         </div>
        </div>
      </form>
    </div>
  );
};
