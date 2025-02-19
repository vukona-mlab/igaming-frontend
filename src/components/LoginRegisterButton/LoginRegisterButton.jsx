import Button from 'react-bootstrap/Button';
import { HiArrowSmRight } from "react-icons/hi";



import './loginButton.css';

function LoginRegisterButton({text, func}) {

  return (
    <>
      <Button className="login-register-button" variant="dark" onClick={func}>{text}<HiArrowSmRight className='arrow-icon'/></Button>
    </>
  );
}

export default LoginRegisterButton;