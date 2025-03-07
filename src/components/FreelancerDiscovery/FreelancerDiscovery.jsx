import React, { useState, useEffect } from 'react';
import FreelancerCard from '../Freelancer Card/DpFreelancerCard';
import defaultProfile from '../../assets/clem.jpg';
import messageIcon from '../../assets/message.svg';
import './FreelancerDiscovery.css';
import { useNavigate } from 'react-router-dom';

const FreelancerDiscovery = ({ searchQuery }) => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFreelancers();
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const updateColumns = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if ((width === 1920 && height === 1080) || 
        (width === 1366 && height === 768) ||
        (width === 1210 && height === 784)) {
      setColumns(3);
    } else if ((width === 1440 && height === 970) ||
               (width === 1440 && height === 838)) {
      setColumns(3);
    } else if ((width === 1280 && height === 800) || 
        (width === 1114 && height === 705)) {
      setColumns(3);
    } else if (width === 800 && height === 1280) {
      setColumns(2);
    } else if (width >= 820 && width <= 1180) {
      setColumns(2);
    } else if (width <= 600) {
      setColumns(1);
    } else if (width <= 900) {
      setColumns(2);
    } else if (width >= 768 && width <= 970) {
      setColumns(2);
    } else if (width >= 971 && width <= 1024) {
      setColumns(3);
    } else if (width <= 1200) {
      setColumns(3);
    } else {
      setColumns(4);
    }
  };

  const fetchFreelancers = async () => {
    try {
      const token = localStorage.getItem('token');
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
    console.log(`Message clicked for freelancer: ${freelancerId}`);
  };

  const handleCardClick = (freelancerId) => {
    // Navigate to freelancer's profile page
    navigate(`/freelancerProjects/${freelancerId}`);
  };

  const filteredFreelancers = freelancers.filter((freelancer) => {
    if (!searchQuery.trim()) return true;

    const searchLower = searchQuery.toLowerCase();
    const displayName = (freelancer.displayName || 'Anonymous Freelancer').toLowerCase();
    const jobTitle = (freelancer.jobTitle || 'Freelancer').toLowerCase();
    
    const searchTerms = searchLower.split(' ');
    
    return searchTerms.every(term => {
      if (term === 'anonymous' && displayName.includes('anonymous')) {
        return true;
      }
      return displayName.includes(term) || jobTitle.includes(term);
    });
  });

  if (loading) {
    return <div className="freelancer-discovery-loading">Loading...</div>;
  }

  if (error) {
    return <div className="freelancer-discovery-error">Error: {error}</div>;
  }

  const rows = [];
  for (let i = 0; i < filteredFreelancers.length; i += columns) {
    rows.push(filteredFreelancers.slice(i, i + columns));
  }

  return (
    <div className="freelancer-discovery">
    {rows.map((row, rowIndex) => (
      <div key={rowIndex} className="freelancer-row">
        {row.map((freelancer) => (
          <div
            key={freelancer.id}
            className="freelancer-card-wrapper"
            onClick={() => handleCardClick(freelancer.id)} // Card click handler
          >
            <FreelancerCard
              profilePicture={freelancer.profilePicture || defaultProfile}
              name={freelancer.displayName || 'Anonymous Freelancer'}
              jobTitle={freelancer.jobTitle || 'Freelancer'}
              projectsCompleted={freelancer.projects?.length || 0}
              rating={4.5}
              messageIcon={messageIcon}
              onMessageClick={() => handleMessageClick(freelancer.id)}
            />
            {/* Hover message */}
            <div className="hover-message">Click image to view more</div>
          </div>
        ))}
      </div>
    ))}
  </div>
);
};
export default FreelancerDiscovery;
