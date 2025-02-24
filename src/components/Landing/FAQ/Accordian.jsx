import { useState } from "react";
import styles from "./Accordian.module.css";

function Accordion({ question, answer }) {
  const [isActive, setActive] = useState(false);
  const handleClick = () => setActive(!isActive);
  return (
    <>
      <div className="Accordion">
        <div className="accordian-div" onClick={handleClick}>
          <p className={styles.question}>{question}</p>
          {/* <img src={isActive ? minusIcon : plusIcon} /> */}
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
