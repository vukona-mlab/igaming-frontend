import React from 'react';
import './bankingDetails.css';


export default function BankingDetailsSection(){
    return(
        <>
        <h3 className="details-text">Bank Details</h3>
        <div className="bank-details">
            <div className="left">
                <div className="bank-name">STANDARD BANK</div>
                <div className="text">Account Number</div>
                </div>
            <div className="right">
                <div className="edit-button">Edit</div>
                <div className="number">*******8754</div>
                </div>
        </div>
        </>
    )
}