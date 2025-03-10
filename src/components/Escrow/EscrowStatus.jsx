import React from 'react';
import './EscrowStatus.css'; // Add your styles here

const EscrowStatus = ({ status }) => {
  const getStatusClass = () => {
    if (status.includes("success")) {
      return "status-success";
    } else if (status.includes("Error")) {
      return "status-error";
    } else {
      return "status-default";
    }
  };

  return (
    <div className={`escrow-status ${getStatusClass()}`}>
      <h3>Escrow Status</h3>
      <p>{status}</p>
    </div>
  );
};

export default EscrowStatus;