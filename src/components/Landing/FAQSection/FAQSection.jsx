import React from "react";
import styles from "./FAQSection.module.css";
import Accordion from "../FAQ/Accordian";
import SectionHeader from "../section-header/SectionHeader";

const FAQSection = () => {
  const data = [
    {
      question: "Lorem ipsum dolor sit amet",
      answer: {
        title: "Ipsum dolor sit amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Fusce dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer: {
        title: "Ipsum dolor sit amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Fusce dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer: {
        title: "Ipsum dolor sit amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Fusce dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer: {
        title: "Ipsum dolor sit amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Fusce dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer: {
        title: "Ipsum dolor sit amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Fusce dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer: {
        title: "Ipsum dolor sit amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Fusce dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
  ];
  return (
    <section className={styles.FAQSection}>
      <SectionHeader text="FAQ" />
      <div className={styles.FAQTitle}>Frequently Asked Questions</div>
      {data.map((item, i) => (
        <Accordion key={i} question={item.question} answer={item.answer} />
      ))}
    </section>
  );
};

export default FAQSection;
