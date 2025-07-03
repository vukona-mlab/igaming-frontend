import React, { useState } from "react";
import "./TransactionDetails.css";
import styles from "../../Landing/FAQ/Accordian.module.css";
// import styles from "C:\Users\vukon\development\mlab\codetribe\Pretoria\research-igaming\research-igaming-frontend\src\components\Payments\TransactionDetails\TransactionDetails.jsx"
// import styles from "C:\Users\vukon\development\mlab\codetribe\Pretoria\research-igaming\research-igaming-frontend\src\components\Landing\FAQ\Accordian.module.css"
import ArrowDropDown from "../../../assets/arrow-drop-down-48px.svg";

const TransactionDetails = ({ title, price, description, requirements, message, reference, date, func, buttonText, showButton }) => {
  // console.log({ buttonText, lg, date, sm });
  const [isActive, setActive] = useState(false);
  const handleClick = () => setActive(!isActive);
  if(message) return (
    <div className="transaction-details">
      <span className="td-message">{message}</span>
    </div>
  )
  return (
    <div>
      <div className="transaction-details">
        <div className="row-flex">
          <span>{title}</span>
          {
            showButton ? (
              <button className="td-btn" onClick={func}>
                {buttonText} {" " + price} 
              </button>
            ) : (
              <span>R {price}</span>
            )
          }
        </div>
        <div className="row-flex">
          <span className="td-ref">{description}</span>
          <img
            src={ArrowDropDown}
            className={isActive ? styles.arrowIconUp : styles.arrowIconDown}
            onClick={handleClick}
          />
        </div>
        {/* <div className="td-message">{message}</div> */}
        {/* <div className="td-ref">{reference}</div> */}
        <div className="td-date-delete">
          {/* <div className="td-date">{date}</div> */}
          {
            showButton && (
              <button className="td-btn" onClick={func}>
                {buttonText}
              </button>
            )
          }

        </div>
      </div>
      {isActive && (
        <div className={'dropdown-content'}>
          {
            !showButton && (
              <div className="row-flex">
                <span>{date}</span>
                <span>R {price}</span>
              </div>
            )
          }

          <div className="row-flex">
            <span>Requirements</span>
            <div>
              <ul>
                {
                  requirements && requirements.length > 0 && requirements.map(item => {
                    return <li style={{ textAlign: 'right' }}>{item}</li>
                  })
                }
              </ul>
            </div>
          </div>
          <div className="row-flex">
            <span className="td-ref">Reference Number</span>
            <span className="td-ref">{reference}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;
