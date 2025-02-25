import React from "react";
import styles from "./SectionTitle.module.css";

const SectionTitle = ({ text, bold }) => {
  return (
    <section className={styles.SectionTitle}>
      <div className={styles.text}>
        {text}
        {bold !== "" && <span style={{ fontWeight: "bold" }}>{bold}</span>}
      </div>
      <div className={styles.line}></div>
    </section>
  );
};

export default SectionTitle;
