import Reac, { useState, useEffect } from "react";
import styles from "./TopFreelancers.module.css";
import SectionHeader from "../section-header/SectionHeader";
import FreelancerCard from "../../Freelancer Card/DpFreelancerCard";
import SeeMoreButton from "../SeeMoreButton/SeeMoreButton";

const TopFreelancers = () => {
  const [loading, setLoading] = useState(true);
  const [freelancers, setFreelancers] = useState([]);
  const url = "http://localhost:8000/api/freelancers/projects";

  useEffect(() => {
    getTopFreelancers();
  }, []);

  const getTopFreelancers = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(response);

        setFreelancers(data.freelancers.slice(0, 3));
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  if (loading) return;
  return (
    <section className={styles.TopFreelancers}>
      <SectionHeader text="Top Freelancers" />
      <div className={styles.sectionBody}>
        {freelancers &&
          freelancers.map((freelancer, i) => (
            <FreelancerCard
              key={i}
              profilePicture={freelancer.profilePicture}
              name={freelancer.displayName}
              jobTitle={freelancer.jobTitle}
              projectsCompleted={freelancer.projects.length}
              rating={freelancer.rating}
            />
          ))}
      </div>
      <div className={styles.sectionButton}>
        <SeeMoreButton text="See more" onClick={() => console.log()} />
      </div>
    </section>
  );
};

export default TopFreelancers;
