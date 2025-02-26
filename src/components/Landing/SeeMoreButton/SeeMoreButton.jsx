import React from "react";
import styles from "./SeeMoreButton.module.css";

const SeeMoreButton = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.SeeMoreButton}>
      {text}
    </button>
  );
};

export default SeeMoreButton;
