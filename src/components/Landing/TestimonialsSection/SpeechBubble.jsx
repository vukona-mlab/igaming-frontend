import React from "react";
import styles from "./SpeechBubble.module.css";

const SpeechBubble = ({ text }) => {
  return <div className={styles.SpeechBubble}>{text}</div>;
};

export default SpeechBubble;
