import React from "react";
import styles from "./TestimonyCard.module.css";
import SpeechBubble from "./SpeechBubble";
import TestifierCard from "./TestifierCard";
const TestimonyCard = ({ text, name, country, date, imageUrl }) => {
  return (
    <div className={styles.TestimonyCard}>
      <SpeechBubble text={text} />
      <TestifierCard
        name={name}
        country={country}
        date={date}
        imageUrl={imageUrl}
      />
    </div>
  );
};

export default TestimonyCard;
