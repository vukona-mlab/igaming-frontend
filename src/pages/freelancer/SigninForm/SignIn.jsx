import React, {useState} from 'react';
import './SignIn.css';
import InputForm from '../../../components/reusable-input-form/InputForm';
import LoginRegisterButton from '../../../components/LoginRegisterButton/LoginRegisterButton';
import EmailResetButton from '../../../components/EmailResetButton/Button';
import GoogleSignInButton from '../../../components/googleSignButton/googleSign';

export default function SignIn(){
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      // Submit form
    }
  };
    return(
        <>
       <div className="container">
        <div className="input-form" >
        <LoginRegisterButton text="Register"/>
        <div className="welcome-box">
        <div className="red-line"></div>
        <div className="welcome-text"><h1>WELCOME BACK <br/>
           SIGN IN</h1></div>
        </div>
          <InputForm formData={formData } handleFormDataChange={setFormData} label1={'username'} label2={'password'}/>
          <div className="email-button">
          <EmailResetButton text='Continue with email' onClick={handleSubmit}/>
          </div>
          <div className="google-signin">
          <GoogleSignInButton/>
          </div>
          </div>
        <div className='image-section'>
          <img src="/public/images/ri-experts.jpg" alt="logo" className="image" ></img></div>
       </div>
        </>
    )
}
