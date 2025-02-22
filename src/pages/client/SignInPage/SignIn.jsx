import React, {useState} from 'react';
import './signin.css';
import InputForm from '../../../components/reusable-input-form/InputForm';
import LoadingButton from '../../../components/ButtonLoader/LoadingButton';
import GoogleSignInButton from '../../../components/googleSignButton/googleSign';
import LoginRegisterButton from '../../../components/LoginRegisterButton/LoginRegisterButton';

export default function Signin(){
    const [formData, setFormData] = useState({username:"", password:""});
    const [error, setError] = useState('');
  
    function handleFormDataChange(e){
      const value = e.target.value;
      setFormData(value)
  
      if (!value.trim()) {
        setError('This field is required.');
      } else {
        setError('');
      }
    }
    return(
        <>
        <div className="container">
            <div className="left-side">
                <LoginRegisterButton text="Register"/>
            <div className="welcome-box">
        <div className="red-line"></div>
        <div className="welcome-text"><h1>WELCOME BACK <br/>
           SIGN IN</h1></div>
        </div>
            <InputForm formData={formData } handleFormDataChange={setFormData} label1={'username'} label2={'password'}/>
            <div className="loading-btn"><LoadingButton/></div>
            <div className="google-signin"><GoogleSignInButton/></div>
            </div>
            <div className="right-side"><img src="/public/images/ri-experts.jpg" alt="logo" className="image" ></img></div>
        </div>
        </>
    )
}