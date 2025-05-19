import React, { useState } from "react";
import NavBar from "../../components/Common/Navbar/navbar";
import SubNavBar from "../../components/Common/SubNavBar/SubNavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import FreelancerDiscovery from "../../components/FreelancerDiscovery/FreelancerDiscovery";
import "./DiscoveryPage.css";
import { useParams, Outlet } from "react-router-dom";
const DiscoveryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { freelancer_id } = useParams();
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  if (freelancer_id !== "" && typeof freelancer_id !== "undefined") {
    return <Outlet />;
  }
  return (
    <div className="discovery-page">
      <div className="navigation-container">
        <NavBar />
        <SubNavBar />
      </div>

        <SearchBar
          placeholder="Search by name or job title..."
          onSearch={handleSearch}
        />

      <div className="section-divider"></div>

      
        <FreelancerDiscovery searchQuery={searchQuery} />

    </div>
  );
};

export default DiscoveryPage;
