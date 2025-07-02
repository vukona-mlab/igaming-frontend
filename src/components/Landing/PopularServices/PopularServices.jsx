import React, { useEffect, useState } from "react";
import ServicesCard from "../../ServicesCard/ServicesCard";
import SectionHeader from "../section-header/SectionHeader";
import SeeMoreButton from "../SeeMoreButton/SeeMoreButton";
import "./PopularServices.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import SectionContainer from "../../SectionContainer";
import BACKEND_URL from "../../../config/backend-config";

const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/services`);
        if (!response.ok) {
          throw new Error("Failed to load services");
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <SectionContainer>
      <section className="popular-services">
        <SectionHeader text="Popular Services" />
        <SectionTitle
          title="Most searched"
          subtitle="Across all the categeries that we have , these are the most searched categories"
          span="categories"
        />
        <div className="services-container">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <ServicesCard
                profilePicture={
                  service.image || "https://via.placeholder.com/150"
                }
                name={service.name}
                projectsCompleted={service.projects || 0}
                likes={service.likes || 0}
                onMessageClick={() => console.log(`Explore ${service.name}`)}
                buttonText="Explore"
              />
            </div>
          ))}
        </div>
        <div className="sectionButton">
          <SeeMoreButton text="See more" onClick={() => console.log()} />
        </div>
      </section>
    </SectionContainer>

  );
};

export default PopularServices;
