import Button from "react-bootstrap/Button";

import "./button.css";

function EmailResetButton({ text, func }) {
  return (
    <>
      <Button className="email-reset-button" variant="dark" onClick={func}>
        {text}
      </Button>
    </>
  );
}

export default EmailResetButton;
