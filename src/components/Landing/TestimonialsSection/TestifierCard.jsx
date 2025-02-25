import React from "react";
import styles from "./TestifierCard.module.css";

const TestifierCard = ({ name, country, date, imageUrl }) => {
  return (
    <div className={styles.TestifierCard}>
      <img
        src={imageUrl === "" ? "/images/profile_icon.png" : imageUrl}
        className={styles.testifierImage}
      />
      <div className={styles.testifierDetails}>
        <div className={styles.testifierName}>{name}</div>
        <div className={styles.testifierCountry}>{country}</div>
        <div className={styles.testifierDate}>
          {new Date(date).toUTCString()}
        </div>
      </div>
    </div>
  );
};

export default TestifierCard;
