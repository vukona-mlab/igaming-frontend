import React, { useState, useEffect } from "react";
//import Swal from "sweetalert2"; // Make sure to import SweetAlert
import "./EditForm.css";
import { Form, Button } from "react-bootstrap";
import BACKEND_URL from "../../../config/backend-config";

const EditForm = ({ card, onCancel, onUpdate }) => {
  // State for card details and errors
  const [accountNumber, setAccountNumber] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("basa");
  const [bankCode, setBankCode] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [banks, setBanks] = useState([]);
  const [errors, setErrors] = useState({});

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
  // Fetch card data when the component mounts from bancking component
  useEffect(() => {
    setAccountNumber(card.account_number || "");
    setBankCode(card.bak_code || "");
    setName(card.name || "");
  }, [card]); //run card again

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Card Holder validation (string check, no numbers)
    if (!name.trim()) {
      newErrors.name = "Account holder name is required";
    } else if (/\d/.test(name)) {
      newErrors.name = "Account holder name cannot contain numbers";
    }

    // Expiry Date validation
    // const expiryDatePattern = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    // if (!expiryDate) {
    //   newErrors.expiryDate = "Expiry date is required";
    // } else if (!expiryDatePattern.test(expiryDate)) {
    //   newErrors.expiryDate = "Invalid expiry date format. Use MM/YY (01-12/YY)";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle expiry date input and formatting
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    if (value.length > 5) {
      value = value.slice(0, 5);
    }

    setExpiryDate(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      //pass this data to update function on bankingCard componet
      onUpdate({
        id: card.id,
        account_number: accountNumber,
        name,
        type,
        bank_code: bankCode,
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[400px] mx-auto">
      <h2 className="text-gray-500 text-lg mb-4 m-head">Edit Card Details</h2>
      <form className="w-[387.25px] edit-form" onSubmit={handleSubmit}>
        {/* Card Holder Name */}
        <label className="text-sm mb-1 block update-label">
          Account Holder Name
        </label>
        <input
          type="text"
          value={name}
          className="w-full h-[33px] border-b border-gray-400 outline-none mb-4 form-input"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Account Holder Name"
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
        <label className="text-sm mb-1 block update-label">
          Account Number
        </label>
        <input
          type="text"
          value={accountNumber}
          className="w-full h-[33px] border-b border-gray-400 outline-none mb-4 form-input"
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter Account Number"
        />
        {errors.accountNumber && (
          <p className="error-message">{errors.accountNumber}</p>
        )}
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
        {/* Buttons */}
        <div className="flex justify-between buttonss">
          <button
            type="button"
            className="edit-form-button w-[192.5px] h-[57px] text-red-400 cancel-butt"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="edit-form-button w-[192.5px] h-[57px] bg-black text-white submit-butt"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
