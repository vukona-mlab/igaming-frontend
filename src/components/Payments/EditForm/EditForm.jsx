import React, { useState } from "react";
import "./EditForm.css";
import arrowDropDown from "../../../../public/images/arrow_drop_down.png";

const EditForm = ({ 
  initialBank = "STANDARD BANK", 
  initialAccountNumber = "********5564", 
  initialBranchCode = "051001", 
  onSubmit, 
  onCancel 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(initialBank);
  const [accountNumber, setAccountNumber] = useState(initialAccountNumber);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (bank) => {
    setSelectedBank(bank);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[400px] mx-auto">
      <h2 className="text-gray-500 text-lg mb-4">Edit Bank Details</h2>
      <form className="w-[387.25px]" onSubmit={(e) => { e.preventDefault(); onSubmit({ selectedBank, accountNumber }); }}>
       
        <div className="relative">
          <div className="w-full h-[33px] outline-none mb-4 custom-dropdown" onClick={handleDropdownClick}>
            <span>{selectedBank}</span>
            <img
              src={arrowDropDown}
              alt="dropdown arrow"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
          {isOpen && (
            <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-md z-10">
              {["STANDARD BANK", "FNB", "ABSA"].map((bank) => (
                <div key={bank} className="p-2 cursor-pointer" onClick={() => handleOptionClick(bank)}>
                  {bank}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Branch Code  */}
        <input 
          type="text" 
          value={initialBranchCode} 
          className="w-full h-[33px] border-b border-gray-400 outline-none mb-4" 
          disabled 
        />

        {/* Account Number */}
        <label className="text-sm mb-1 block">Update account number</label>
        <input 
          type="text" 
          value={accountNumber} 
          className="w-full h-[33px] border-b border-gray-400 outline-none mb-4" 
          onChange={(e) => setAccountNumber(e.target.value)}
          style={{ color: '#00000080' }} 
        />

        {/* One-Time Pin */}
        <input type="text" placeholder="One Time Pin" className="w-full h-[33px] border-b border-gray-400 outline-none mb-6" />

        {/* Buttons */}
        <div className="flex justify-between">
          <button type="button" className="w-[192.5px] h-[57px] text-red-400 cancel" onClick={onCancel}>Cancel</button>
          <button type="submit" className="w-[192.5px] h-[57px] bg-black text-white submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
