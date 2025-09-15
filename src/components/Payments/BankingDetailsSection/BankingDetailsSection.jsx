import React, { useEffect, useState } from 'react';
import './bankingDetails.css';
import AddDetails from "../../Payments/AddDetailsForm/AddDetails"
import BankingCard from "../../Payments/BankingCard/BankingCard"

export default function BankingDetailsSection({ disabled }){
    const bankDetails =[ {
        bankName: "STANDARD BANK",
        accountNumber: "*******8754",
      }]
    const [bankCards, setBankCards] = useState([])
    const [hideCards, setHideCards] = useState(false)
    const handleCardAdd = (details) => {
      setBankCards(cards => ([...cards, details]))
    }
    useEffect(() => {
      console.log({ hideCards });
      
    }, [hideCards])
    return(
        <div>
        <h3 className="details-text mt-3">Bank Details</h3>
        <AddDetails addCard={handleCardAdd} setHideCards={setHideCards} disabled={disabled} />
        <BankingCard cards={bankCards} setBankCards={setBankCards} hideCards={hideCards}/>
       {/*  {bankDetails.map((bank, index) => (
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
        ))}*/}
      </div>
    )
}