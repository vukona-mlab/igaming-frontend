import React from "react";
import styles from "./FAQSection.module.css";
import Accordion from "../FAQ/Accordian";
import SectionHeader from "../section-header/SectionHeader";
import SectionContainer from "../../SectionContainer";

const FAQSection = () => {
  const data = [
    {
      question: "What is RI Experts?",
      answer: {
        title: "What is RI Experts?",
        description:
          `RI Experts is a freelancer platform designed for professionals in the gaming industry,
connecting experts with operators, suppliers, affiliates, and other businesses looking for
specialised skills.`,
      },
    },
    {
      question: "Who can join RI Experts?",
      answer: {
        title: "Who can join RI Experts?",
        description:
          `Anyone with expertise in the gaming industry can join, including consultants, developers,
designers, marketers, compliance specialists, responsible gambling experts, trainers, and
more.`,
      },
    },
    {
      question: "How does RI Experts work?",
      answer: {
        title: "How does RI Experts work?",
        description:
          `Freelancers create a profile showcasing their skills and experience, while businesses
recruit them for job opportunities or projects. The platform facilitates connections,
allowing freelancers to be directly hired projects.`,
      },
    },
    {
      question: "Is RI Experts only for iGaming professionals?",
      answer: {
        title: "Is RI Experts only for iGaming professionals?",
        description:
          `While the primary focus is on iGaming and gambling-related industries, professionals with
relevant skills that support the industry, such as legal consultants, content creators, and
customer support specialists, are also welcome, subject to terms and conditions.`,
      },
    },
    {
      question: "How do I get paid as a freelancer?",
      answer: {
        title: "How do I get paid as Freelancer?",
        description:
          `Payments are securely processed through the platform. Depending on the project
agreement, freelancers may receive payments upon project completion, in milestones, or
based on work agreement.`
      },
    },
    {
      question: "Can I set my own rates as a freelancer?",
      answer: {
        title: "Can I set my own rates?",
        description:
          `Yes, you can define your rates for services on projects that match your expertise.`
      },
    },
  ];
  return (
    <SectionContainer>
      <section id="faq" className={styles.FAQSection}>
        <SectionHeader text="FAQ" />
        <div className={styles.FAQTitle}>Frequently Asked Questions</div>
        {data.map((item, i) => (
          <Accordion key={i} question={item.question} answer={item.answer} />
        ))}
      </section>
    </SectionContainer>

  );
};

export default FAQSection;
