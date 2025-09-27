import Reac, { useState, useEffect } from "react";
import styles from "./TopFreelancers.module.css";
import SectionHeader from "../section-header/SectionHeader";
import FreelancerCard from "../../Freelancer Card/FreelancerCard";
import SeeMoreButton from "../SeeMoreButton/SeeMoreButton";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useNavigate } from "react-router";
import BACKEND_URL from "../../../config/backend-config";
import SectionContainer from "../../SectionContainer";

const TopFreelancers = () => {
  const [loading, setLoading] = useState(true);
  const [freelancers, setFreelancers] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    getTopFreelancers();
  }, []);

  const getTopFreelancers = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/freelancers`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log(response);

        setFreelancers(data.freelancers.slice(0, 3));
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  if (loading) return;
  return (
    <SectionContainer>
      <section className={styles.TopFreelancers}>
        <SectionHeader text="Top Freelancers" />
        <SectionTitle
          title="Our Best"
          subtitle="Given their ability and rankings, these are the outstanding freelancers we have."
          span="freelancers"
        />
        <div className={styles.sectionBody}>
          {freelancers &&
            freelancers.map((freelancer, i) => (
              <FreelancerCard
                key={i}
                profilePicture={freelancer.profilePicture}
                name={freelancer.displayName}
                jobTitle={freelancer.jobTitle}
                projectsCompleted={freelancer.projects?.length ?? 0}
                rating={freelancer.rating}
              />
            ))}
        </div>
        <div className={styles.sectionButton}>
          <SeeMoreButton
            text="See more"
            onClick={() => navigation("/discovery")}
          />
        </div>
      </section>
    </SectionContainer>

  );
};

export default TopFreelancers;
