import React from "react";
import styles from "./TestifierCard.module.css";

const TestifierCard = ({ name, country, date, imageUrl }) => {
  let dateStr = new Date(date);
  dateStr = dateStr.toJSON().slice(0, dateStr.toJSON().indexOf("T"));
  dateStr = dateStr.replace(/\-/g, "/");
  return (
    <div className={styles.TestifierCard}>
      <img
        src={imageUrl === "" ? "/images/profile_icon.png" : imageUrl}
        className={styles.testifierImage}
      />
      <div className={styles.testifierDetails}>
        <div className={styles.testifierName}>{name}</div>
        <div className={styles.testifierCountry}>{country}</div>
        <div className={styles.testifierDate}>{dateStr}</div>
      </div>
    </div>
  );
};

export default TestifierCard;
