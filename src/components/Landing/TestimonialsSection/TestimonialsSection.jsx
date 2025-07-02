import Reac, { useState, useEffect } from "react";
import styles from "./TestimonialsSection.module.css";
import SectionHeader from "../section-header/SectionHeader";
import TestimonyCard from "./TestimonyCard";
import SectionContainer from "../../SectionContainer";
import BACKEND_URL from "../../../config/backend-config";

const TestimonialsSection = () => {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const url = `${BACKEND_URL}/api/testimonials`;

  useEffect(() => {
    getTestimonials();
  }, []);

  const getTestimonials = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.testimonials);

        setTestimonials(data.testimonials);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  if (loading) return;
  console.log(testimonials);
  return (
    <SectionContainer>
      <section className={styles.TestimonialsSection}>
        <SectionHeader text="Testimonials" />
        <div className={styles.TestimonialsHeader}>
          <div className={styles.TestimonialsTitle}>
            What <span className={styles.TestimonialsSpan}>customers</span> are
            saying
          </div>
          <div className={styles.TestimonialsSubTitle}>
            Hear from our happpy customers about their experiences with our
            service
          </div>
        </div>
        <div className={styles.sectionBody}>
          {testimonials &&
            testimonials.map((testimonial, i) => (
              <TestimonyCard
                key={i}
                text={testimonial.message}
                name={testimonial.name}
                country={testimonial.country}
                date={testimonial.dateWritten._seconds}
                imageUrl={testimonial.clientProfile}
              />
            ))}
        </div>
      </section>
    </SectionContainer>

  );
};

export default TestimonialsSection;
