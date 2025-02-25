import React, { useState, useEffect } from 'react';
import FreelancerCard from '../Freelancer Card/FreelancerCard';
import defaultProfile from '../../assets/clem.jpg'; // Assuming clem.jpg is in assets folder
import './FreelancerDiscovery.css';

const FreelancerDiscovery = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await fetch('http://localhost:8000/api/freelancers/projects', {
        headers: {
          'Authorization': token,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch freelancers');
      }

      const data = await response.json();
      setFreelancers(data.freelancers);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleMessageClick = (freelancerId) => {
    // Implement message functionality
    console.log(`Message clicked for freelancer: ${freelancerId}`);
  };

  if (loading) {
    return <div className="freelancer-discovery-loading">Loading...</div>;
  }

  if (error) {
    return <div className="freelancer-discovery-error">Error: {error}</div>;
  }

  return (
    <div className="freelancer-discovery">
      <div className="section-divider"></div>
      <div className="freelancer-grid">
        {freelancers.map((freelancer) => (
          <FreelancerCard
            key={freelancer.id}
            profilePicture={freelancer.profilePicture || defaultProfile}
            name={freelancer.displayName || 'Anonymous Freelancer'}
            jobTitle={freelancer.jobTitle || 'Freelancer'}
            projectsCompleted={freelancer.projects?.length || 0}
            rating={4.5} // You might want to calculate this based on project ratings
            onMessageClick={() => handleMessageClick(freelancer.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FreelancerDiscovery; 