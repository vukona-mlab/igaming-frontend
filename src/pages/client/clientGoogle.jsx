import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClientGoogle = () => {
  const navigate = useNavigate();

  const responseGoogle = async (credentialResponse) => {
    console.log("Credential Response:", credentialResponse);
    try {
      const res = await axios.post('http://localhost:8000/api/auth/google', { 
        idToken: credentialResponse.credential 
      });
      console.log("Success:", res.data);
      
      // Store the token and user data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('userRole', 'client');

      // Redirect to profile page
      navigate('/profile');
      
    } catch (error) {
      console.error("Google Sign-In Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in with Google</h2>
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </div>
  );
};

export default ClientGoogle;
