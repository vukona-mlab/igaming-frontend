import React, { useEffect, useState } from 'react';
import EscrowForm from '../../components/Escrow/EscrowForm';
import EscrowStatus from '../../components/Escrow/EscrowStatus';
import './EscrowPage.css';
import { useLocation } from 'react-router-dom';
import BACKEND_URL from '../../config/backend-config';

const EscrowPage = () => {
  const location = useLocation();
  const { escrowData } = location.state || {};
  
  // Log the parameters being passed to the EscrowPage
  console.log('Escrow Data:', escrowData);

  // State for seller and buyer emails
  const [sellerEmail, setSellerEmail] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [escrowStatus, setEscrowStatus] = useState('');

  useEffect(() => {
    if (escrowData) {
      // Autofill emails from escrowData
      setSellerEmail(escrowData.freelancerEmail);
      setBuyerEmail(escrowData.clientEmail);
    }
  }, [escrowData]);

  const handleEscrowSubmit = async (data) => {
    const fullData = {
      ...data,
      freelancerId: escrowData.freelancerId,
      clientId: escrowData.clientId,
      freelancerEmail: sellerEmail,
      clientEmail: buyerEmail,
    };
    
    console.log('Full Data Submitted:', fullData);
    
    try {
      const token = localStorage.getItem('token'); // Fetch the token from local storage
      console.log('Retrieved Token:', token); // Log the token for debugging

      const response = await fetch(`${BACKEND_URL}/api/escrows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? token : '', // Include the token in the Authorization header
        },
        body: JSON.stringify(fullData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the response text
        console.error('Error response:', errorText); // Log the error response
        setEscrowStatus(`Error: ${errorText}`); // Use errorText instead of result.error
      } else {
        const result = await response.json();
        setEscrowStatus('Escrow created successfully!');
      }
    } catch (error) {
      setEscrowStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="escrow-page">
      <h1>Create Escrow Transaction</h1>
      <EscrowForm 
        onSubmit={handleEscrowSubmit} 
        freelancerId={escrowData.freelancerId} 
        clientId={escrowData.clientId} 
        sellerEmail={sellerEmail}
        buyerEmail={buyerEmail}
      />
      <EscrowStatus status={escrowStatus} />
    </div>
  );
};

export default EscrowPage;
