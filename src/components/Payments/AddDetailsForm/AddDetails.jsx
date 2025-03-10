import React, { useState } from "react"; 
import "./AddDetails.css"; 
import arrowDropDown from "../../../../public/images/arrow_drop_down.png"; 

const AddBankDetailsForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("Choose bank");

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (bank) => {
    setSelectedBank(bank);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[400px] mx-auto">
      <h2 className="text-gray-500 text-lg mb-4">Add Bank Details</h2>
      <form className="w-[387.25px]">
        <div className="relative">
          <div className="w-full h-[33px] border-b border-gray-400 outline-none mb-4 custom-dropdown" onClick={handleDropdownClick}>
            <span>{selectedBank}</span>
            <img
              src={arrowDropDown}
              alt="dropdown arrow"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
          {isOpen && (
            <div className="absolute w-full bg-white border border-gray-400 mt-1 rounded-md z-10">
              <div className="p-2 cursor-pointer" onClick={() => handleOptionClick("Bank A")}>Bank A</div>
              <div className="p-2 cursor-pointer" onClick={() => handleOptionClick("Bank B")}>Bank B</div>
              <div className="p-2 cursor-pointer" onClick={() => handleOptionClick("Bank C")}>Bank C</div>
           
            </div>
          )}
        </div>
        <input type="text" placeholder="Branch code" className="w-full h-[33px] border-b border-gray-400 outline-none mb-4" />
        <input type="text" placeholder="Account number" className="w-full h-[33px] border-b border-gray-400 outline-none mb-6" />
        <div className="flex justify-between">
          <button className="w-[192.5px] h-[57px] text-red-400 cancel">Cancel</button>
          <button className="w-[192.5px] h-[57px] bg-black text-white submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddBankDetailsForm;
