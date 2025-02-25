import React from "react";
import styles from "./SectionTitle.module.css";

const SectionTitle = ({ title, subtitle, span }) => {
  return (
    <section className={styles.SectionTitle}>
      <div className={styles.SectionTitleDiv}>
        {title} <span className={styles.SectionTitleSpan}>{span}</span>
      </div>
      <div className={styles.SectionTitleSubTitle}>{subtitle}</div>
    </section>
  );
};

export default SectionTitle;
