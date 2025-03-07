import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import './EscrowForm.css'; // Add your styles here

const EscrowForm = ({ onSubmit, freelancerId, clientId, sellerEmail, buyerEmail }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  // Use useEffect to set the emails based on the IDs
  useEffect(() => {
    const fetchUserDetails = async (userId) => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      return data.email; // Assuming the response contains an email field
    };

    const setEmails = async () => {
      if (freelancerId) {
        const email = await fetchUserDetails(freelancerId);
        console.log('Buyer Email Set:', email); // Log the buyer email
      }
      if (clientId) {
        const email = await fetchUserDetails(clientId);
        console.log('Seller Email Set:', email); // Log the seller email
      }
    };

    setEmails();
  }, [freelancerId, clientId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount });
  };

  return (
    <Form onSubmit={handleSubmit} className="escrow-form">
      <Form.Group controlId="formSellerEmail">
        <Form.Label>Seller Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter seller's email"
          value={sellerEmail}
          readOnly
        />
      </Form.Group>

      <Form.Group controlId="formBuyerEmail">
        <Form.Label>Buyer Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter buyer's email"
          value={buyerEmail}
          readOnly
        />
      </Form.Group>

      <Form.Group controlId="formAmount">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Escrow
      </Button>
    </Form>
  );
};

export default EscrowForm;
