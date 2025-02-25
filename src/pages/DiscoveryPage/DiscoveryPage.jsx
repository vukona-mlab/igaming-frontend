import React from 'react';
import NavBar from '../../components/Common/Navbar/navbar';
import SubNavBar from '../../components/Common/SubNavBar/SubNavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import FreelancerDiscovery from '../../components/FreelancerDiscovery/FreelancerDiscovery';
import './DiscoveryPage.css';

const DiscoveryPage = () => {
  return (
    <div className="discovery-page">
      <div className="navigation-container">
        <NavBar />
        <SubNavBar />
      </div>
      <div className="search-container">
        <SearchBar placeholder="Search freelancers..." />
      </div>
      <div className="section-divider"></div>

      <div className="content-container">
        <FreelancerDiscovery />
      </div>
    </div>
  );
};

export default DiscoveryPage; 