import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PopularServices.css";

const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/services"); 
        setServices(response.data);
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
    <section className="popular-services">
      <h2 className="popular-title">Popular Services</h2>
      <div className="services-container">
        {services.map((service) => (
          <div key={service.id} className="project-card">
            <img
              src={service.image || "https://via.placeholder.com/300"}
              alt={service.name}
              className="project-image"
            />
            <div className="project-info">
              <h3 className="project-name">{service.name}</h3>
              <p className="project-likes">{service.likes || 0} likes</p>
              <p className="project-count">{service.projects || 0} Projects</p>
              <button className="explore-btn">Explore</button>
            </div>
          </div>
        ))}
      </div>
      <button className="see-more-btn">See more</button>
    </section>
  );
};

export default PopularServices;
