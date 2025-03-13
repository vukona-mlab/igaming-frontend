import React, { useState } from "react"; 
import "./EditForm.css";

const EditForm = ({ 
  initialCardHolder = "", 
  initialExpiryDate = "", 
  onSubmit, 
  onCancel 
}) => {
  const [cardHolder, setCardHolder] = useState(initialCardHolder);
  const [expiryDate, setExpiryDate] = useState(initialExpiryDate);
  const [errors, setErrors] = useState({
    cardHolder: "",
    expiryDate: ""
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ cardHolder, expiryDate });
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[400px] mx-auto container">
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
