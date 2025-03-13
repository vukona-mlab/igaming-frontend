import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook from react-router-dom
import Swal from "sweetalert2"; // Make sure to import SweetAlert
import "./EditForm.css";

const EditForm = ({ onSubmit, onCancel }) => {
  // Get cardId from URL parameters
  const { cardId } = useParams(); // cardId will be read from the URL

  // State for card details and errors
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [errors, setErrors] = useState({
    cardHolder: "",
    expiryDate: "",
  });

  // Fetch card data when the component mounts
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/cards/${cardId}`);
        const data = await response.json();
        if (response.ok) {
          setCardHolder(data.cardHolder || "");
          setExpiryDate(data.expiryDate || "");
        } else {
          console.error("Failed to fetch card data:", data);
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    if (cardId) {
      fetchCardData();
    }
  }, [cardId]);

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Card Holder validation (string check, no numbers)
    if (!cardHolder.trim()) {
      newErrors.cardHolder = "Card holder name is required";
    } else if (/\d/.test(cardHolder)) {
      newErrors.cardHolder = "Card holder name cannot contain numbers";
    }

    // Expiry Date validation
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    if (!expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!expiryDatePattern.test(expiryDate)) {
      newErrors.expiryDate = "Invalid expiry date format. Use MM/YY (01-12/YY)";
    }

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
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8000/api/cards/${cardId}`, {
          method: "PUT", // or PATCH based on the server's requirement
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Send token without "Bearer" prefix
          },
          body: JSON.stringify({ cardHolder, expiryDate }),
        });

        const data = await response.json();
        if (response.ok) {
          onSubmit(data); // Call onSubmit with the updated card data
        } else {
          // Handle server error
          const errorMessage = data.error || "Failed to update card. Please try again.";
          Swal.fire("Error", errorMessage, "error"); // Show SweetAlert with error message
          console.error("Failed to update card:", data); // Log the error
        }
      } catch (error) {
        console.error("Error updating card:", error);
        Swal.fire("Error", "There was an issue updating the card.", "error"); // Show SweetAlert on error
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[400px] mx-auto" style={{ border: "1px solid red" }}>
      <h2 className="text-gray-500 text-lg mb-4 m-head">Edit Card Details</h2>
      <form className="w-[387.25px] edit-form" onSubmit={handleSubmit}>
        {/* Card Holder Name */}
        <label className="text-sm mb-1 block update-label">Card Holder Name</label>
        <input
          type="text"
          value={cardHolder}
          className="w-full h-[33px] border-b border-gray-400 outline-none mb-4 form-input"
          onChange={(e) => setCardHolder(e.target.value)}
          placeholder="Enter Card Holder Name"
        />
        {errors.cardHolder && <p className="error-message">{errors.cardHolder}</p>}

        {/* Expiry Date */}
        <label className="text-sm mb-1 block update-label">Expiry Date</label>
        <input
          type="text"
          value={expiryDate}
          className="w-full h-[33px] border-b border-gray-400 outline-none mb-4 form-input"
          onChange={handleExpiryDateChange}
          placeholder="MM/YY"
        />
        {errors.expiryDate && <p className="error-message">{errors.expiryDate}</p>}

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
