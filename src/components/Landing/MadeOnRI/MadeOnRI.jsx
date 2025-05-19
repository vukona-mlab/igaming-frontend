import Reac, { useState, useEffect } from "react";
import styles from "./MadeOnRI.module.css";
import "./MadeOnRI.css";
import SectionHeader from "../section-header/SectionHeader";
import ProjectCard from "../../Project Card/ProjectCard";
import SeeMoreButton from "../SeeMoreButton/SeeMoreButton";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useNavigate } from "react-router";
import SectionContainer from "../../SectionContainer";

const MadeOnRI = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const url = "http://localhost:8000/api/projects";
  const navigation = useNavigate();

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();

        setProjects(data.projects.slice(0, 3));
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  if (loading) return;
  return (
    <SectionContainer>
    <section className={styles.MadeOnRI}>
      <SectionHeader text={`Made on`} bold="RI Experts" />
      <SectionTitle
        title="Projects from our"
        subtitle="Our freelancers are capable of doing unmatched projects that no one can do."
        span="freelancers"
      />
      <div className={styles.sectionBody}>
        {projects &&
          projects.map((project, i) => (
            <div key={i} className={`p-card-${i}`}>
              <ProjectCard
                projectPicture={project.projectPicture}
                projectName={project.projectName}
                likes={project.likes}
                authorName={project.author}
              />
            </div>
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

export default MadeOnRI;
