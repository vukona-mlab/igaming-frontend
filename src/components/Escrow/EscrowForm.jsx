import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import './EscrowForm.css';
import { createEscrowTransaction } from '../../services/escrow';

const EscrowForm = ({ onSubmit, freelancerId, clientId }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [milestones, setMilestones] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [freelancerEmail, setFreelancerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wire');

  useEffect(() => {
    const fetchUserDetails = async (userId, setEmail) => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (clientId) fetchUserDetails(clientId, setClientEmail);
    if (freelancerId) fetchUserDetails(freelancerId, setFreelancerEmail);
  }, [clientId, freelancerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const escrowData = {
        description: description,
        price: amount,
        buyer: {
          email: clientEmail,
          // Add other required buyer details
        },
        seller: {
          email: freelancerEmail,
          // Add other required seller details
        },
        payment_method: paymentMethod,
        items: [{
          description: description,
          schedule: milestones,
          price: amount,
          quantity: 1
        }]
      };

      // Call Escrow.com API
      const transaction = await createEscrowTransaction(escrowData);
      
      // Handle successful creation
      onSubmit({
        ...escrowData,
        transactionId: transaction.id,
        escrowStatus: transaction.status
      });

    } catch (error) {
      console.error('Error creating escrow transaction:', error);
      // Handle error appropriately
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="escrow-form">
      <div className="form-header">
        <h2>ESCROW AGREEMENT</h2>
        <p>This agreement is made and entered into on {new Date().toLocaleDateString()}</p>
      </div>

      <div className="form-section">
        <div className="section-title">PARTY INFORMATION</div>
        <Form.Group controlId="formClientEmail">
          <Form.Label>Client Email (Buyer)</Form.Label>
          <Form.Control type="email" value={clientEmail} readOnly />
        </Form.Group>

        <Form.Group controlId="formFreelancerEmail">
          <Form.Label>Freelancer Email (Seller)</Form.Label>
          <Form.Control type="email" value={freelancerEmail} readOnly />
        </Form.Group>
      </div>

      <div className="form-section">
        <div className="section-title">TRANSACTION DETAILS</div>
        <Form.Group controlId="formAmount">
          <Form.Label>Deposit Amount (USD)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter deposit amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter detailed description of work to be performed"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
      </div>

      <div className="form-section">
        <div className="section-title">PAYMENT TERMS</div>
        <Form.Group controlId="formMilestones">
          <Form.Label>Payment Milestones</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Specify the conditions and milestones for fund release"
            value={milestones}
            onChange={(e) => setMilestones(e.target.value)}
          />
        </Form.Group>
      </div>

      <div className="form-section">
        <div className="section-title">PAYMENT METHOD</div>
        <Form.Group controlId="formPaymentMethod">
          <Form.Label>Select Payment Method</Form.Label>
          <Form.Control
            as="select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="wire">Wire Transfer</option>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="ach">ACH (US Bank Accounts)</option>
          </Form.Control>
        </Form.Group>
      </div>

      <Button variant="primary" type="submit">
        Create Escrow Agreement
      </Button>
    </Form>
  );
};

export default EscrowForm;
