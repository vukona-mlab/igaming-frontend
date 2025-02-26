import React from "react";
import styles from "./SectionHeader.module.css";

const SectionHeader = ({ text, bold }) => {
  return (
    <section className={styles.SectionHeader}>
      <div className={styles.text}>
        {text}{" "}
        {bold !== "" && <span style={{ fontWeight: "bold" }}>{bold}</span>}
      </div>
      <div className={styles.line}></div>
    </section>
  );
};

export default SectionHeader;
