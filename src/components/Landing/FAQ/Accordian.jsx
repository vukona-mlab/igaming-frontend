import { useState } from "react";
import styles from "./Accordian.module.css";
import ArrowDropDown from "../../../assets/arrow-drop-down-48px.svg";

function Accordion({ question, answer }) {
  const [isActive, setActive] = useState(false);
  const handleClick = () => setActive(!isActive);
  return (
    <>
      <div className="Accordion">
        <div className={styles.accordianDiv} onClick={handleClick}>
          <p className={styles.question}>{question}</p>
          <img
            src={ArrowDropDown}
            className={isActive ? styles.arrowIconUp : styles.arrowIconDown}
          />
        </div>
        {isActive && (
          <div className={styles.answer}>
            <p className={styles.answerTitle}>{answer.title}</p>

            <p className={styles.answerDescription}>{answer.description}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Accordion;
