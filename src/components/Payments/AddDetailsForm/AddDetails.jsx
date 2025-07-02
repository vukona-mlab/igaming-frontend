import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "./AddDetails.css";
import BACKEND_URL from "../../../config/backend-config";
//import Bankingdetails from"../../../components/Payments/BankingDetailsSection/BankingDetailsSection"
//type, bank_code, account_number, name
const AddBankDetailsForm = ({ setHideCards }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("basa");
  const [bankCode, setBankCode] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [banks, setBanks] = useState([]);

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/banks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        if (data) {
          setBanks(data.data);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchBanks();
  }, [token]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No authentication token found. Please log in again.",
      });
      return;
    }

    console.log("Token:", token); // Check if token is available

    // Use the hardcoded API URL
    const apiUrl = `${BACKEND_URL}/api/bank-accounts`; // Replace with your localhost URL

    // Prepare the data to send
    const bankDetails = {
      userId: localStorage.getItem("uid"),
      account_number: accountNumber,
      name,
      type,
      bank_code: bankCode,
    };

    console.log({ bankDetails });
    try {
      // Send the data to the API using a POST request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(bankDetails),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Data submitted successfully:", data);

        // Clear the form fields
        setBankCode("");
        setAccountNumber("");
        setName("");
        setType("");

        setShowForm(false);
        setHideCards(!showForm)
        // Show success alert with SweetAlert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Banking details have been added successfully.",
          confirmButtonText: "Okay",
        });
        
      } else {
        console.error(
          "Error submitting data:",
          response.statusText,
          data.error
        );
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Submission failed with status: ${response.statusText}, ${data.error}`,
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Network error: ${error.message}`,
      });
    }
  };

  return (
    <div className="outer-diving">
      <div className="btn-adit-me">
        {/*<h2 className="text-gray-500 text-lg mb-4">Bank Details</h2>*/}
        <Button variant="dark" onClick={() => { setShowForm(!showForm); setHideCards(!showForm)}}>
          {showForm ? "Close Form" : "Add Card"}
        </Button>
      </div>

      {showForm && (
        <div className="bank-form">
          <Form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <Form.Control
              type="text"
              placeholder="Account Number"
              className="input-field mb-3"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />

            <Form.Control
              type="text"
              placeholder="Account holder name"
              className="input-field mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Form.Group className="mb-3">
              <Form.Label>Select Bank</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setBankCode(e.target.value)}
              >
                <option value="">Select a Bank</option>
                {banks &&
                  banks.length > 0 &&
                  banks.map((bank) => (
                    <option key={bank.id} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Control
              type="text"
              placeholder="Type"
              className="input-field mb-3"
              value={type}
              readOnly // Keeps the default as "ZA"
            />

            {/* Buttons */}
            <div className="button-group">
              <Button
                variant="light"
                className="cancel-btn"
                onClick={() => { setShowForm(false); setHideCards(!showForm)}}
              >
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
