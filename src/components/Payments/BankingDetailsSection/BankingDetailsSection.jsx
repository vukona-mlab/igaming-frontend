import React from 'react';
import './bankingDetails.css';


export default function BankingDetailsSection(){
    const bankDetails =[ {
        bankName: "STANDARD BANK",
        accountNumber: "*******8754",
      }]
    return(
        <div>
        <h3 className="details-text">Bank Details</h3>
        {bankDetails.map((bank, index) => (
          <div className="bank-details" key={index}>
            <div className="left">
              <div className="bank-name">{bank.bankName}</div>
              <div className="text">Account Number</div>
            </div>
            <div className="right">
              <div className="edit-button">Edit</div>
              <div className="number">{bank.accountNumber}</div>
            </div>
          </div>
        ))}
      </div>
    )
}