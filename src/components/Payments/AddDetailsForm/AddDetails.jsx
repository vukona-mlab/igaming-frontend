import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import "./AddDetails.css";

const AddBankDetailsForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [countryCode, setCountryCode] = useState("ZA");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No authentication token found. Please log in again.',
      });
      return;
    }

    console.log("Token:", token); // Check if token is available

    // Use the hardcoded API URL
    const apiUrl = "http://localhost:8000/api/cards"; // Replace with your localhost URL

    // Prepare the data to send
    const bankDetails = {
      cardNumber,
      expiryDate,
      cardHolderName,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      countryCode,
    };

    try {
      // Send the data to the API using a POST request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: token 
        },
        body: JSON.stringify(bankDetails),
      });
        
      const data = await response.json();
      if (response.ok) {
        
        console.log("Data submitted successfully:", data);
      
        setShowForm(false);

        // Show success alert with SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Banking details have been added successfully.',
          confirmButtonText: 'Okay',
        });
      } else {
        
        console.error("Error submitting data:", response.statusText,data.error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Submission failed with status: ${response.statusText,data.error}`,
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Network error: ${error.message}`,
      });
    }
  };

  return (
    <div className="outer-diving">
      <div className="btn-adit-me">
        <h2 className="text-gray-500 text-lg mb-4">Bank Details</h2>
        <Button variant="dark" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Edit Card"}
        </Button>
      </div>

      {showForm && (
        <div className="bank-form">
          <Form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <Form.Control
              type="text"
              placeholder="Card Number"
              className="input-field mb-3"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <Form.Control
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="input-field mb-3"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />

            <Form.Control
              type="text"
              placeholder="Cardholder Name"
              className="input-field mb-3"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
            />

            <Form.Control
              type="text"
              placeholder="Address Line 1"
              className="input-field mb-3"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
            />

            <Form.Control
              type="text"
              placeholder="Address Line 2"
              className="input-field mb-3"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
            />

            <Form.Control
              type="text"
              placeholder="City"
              className="input-field mb-3"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <Form.Control
              type="text"
              placeholder="State"
              className="input-field mb-3"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />

            <Form.Control
              type="text"
              placeholder="Postal Code"
              className="input-field mb-3"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />

            <Form.Control
              type="text"
              placeholder="Country Code"
              className="input-field mb-3"
              value={countryCode}
              readOnly // Keeps the default as "ZA"
            />

            {/* Buttons */}
            <div className="button-group">
              <Button variant="light" className="cancel-btn" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button variant="dark" type="submit" className="submit-btn">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AddBankDetailsForm;
