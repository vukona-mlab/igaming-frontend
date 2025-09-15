import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './SwitchRoleButton.css';

const SwitchRoleButton = ({ currentRole, onRoleSwitch }) => {
  const handleRoleSwitch = async () => {
    try {
      const newRole = currentRole === "freelancer" ? "client" : "freelancer";
      
      const result = await Swal.fire({
        title: 'Switch Role?',
        text: `Are you sure you want to switch to ${newRole} mode?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, switch role',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        onRoleSwitch(newRole);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to switch roles. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Button
      variant="dark"
      onClick={handleRoleSwitch}
      className="role-switch-button"
    >
      Switch to {currentRole === "freelancer" ? "Client" : "Freelancer"}
    </Button>
  );
};

export default SwitchRoleButton; 