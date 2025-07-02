import React, { useState } from "react";
import "./TransactionDetails.css";
import styles from "../../Landing/FAQSection/FAQSection.module.css";
import ArrowDropDown from "../../../assets/arrow-drop-down-48px.svg";

const TransactionDetails = ({ title, price, description, message, reference, date, func, buttonText, showButton }) => {
  // console.log({ buttonText, lg, date, sm });
  const [isActive, setActive] = useState(false);
  const handleClick = () => setActive(!isActive);
  return (
    <div>
      <div className="transaction-details">
        <div className="row-flex">
          <span>{title}</span>
          <span>{price}</span>
        </div>
        <div className="row-flex">
          <span>{description}</span>
          <img
            src={ArrowDropDown}
            className={isActive ? styles.arrowIconUp : styles.arrowIconDown}
            onClick={handleClick}
          />
        </div>
        <div className="td-message">{message}</div>
        <div className="td-ref">{reference}</div>
        <div className="td-date-delete">
          <div className="td-date">{date}</div>
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
            <p className={styles.answerTitle}>{'title'}</p>

            <p className={styles.answerDescription}>{'Description'}</p>
          </div>
        )}
      {/* <div className="accordion">
        <div className={styles.accordianDiv} onClick={handleClick}>
          <p className={styles.question}>{'Questions'}</p>
          <img
            src={ArrowDropDown}
            className={isActive ? styles.arrowIconUp : styles.arrowIconDown}
          />
        </div>
        {isActive && (
          <div className={styles.answer}>
            <p className={styles.answerTitle}>{'title'}</p>

            <p className={styles.answerDescription}>{'Description'}</p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default TransactionDetails;
