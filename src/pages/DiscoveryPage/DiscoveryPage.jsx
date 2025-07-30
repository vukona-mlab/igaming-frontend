import React, { useState, useEffect } from "react";
import NavBar from "../../components/Common/Navbar/navbar";
import SubNavBar from "../../components/Common/SubNavBar/SubNavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import FreelancerDiscovery from "../../components/FreelancerDiscovery/FreelancerDiscovery";
import "./DiscoveryPage.css";
import { useParams, Outlet } from "react-router-dom";
import SectionContainer from "../../components/SectionContainer";
const DiscoveryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { freelancer_id } = useParams();
  const [catergory, setCatergory] = useState("");
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  useEffect(() => {
    const url = window.location.hash;
    if (url.startsWith("#")) {
      setCatergory(url.substring(1));
    } else {
      setCatergory("");
    }
  }, [window.location.hash]);
  if (freelancer_id !== "" && typeof freelancer_id !== "undefined") {
    return <Outlet />;
  }
  return (
    <div className="discovery-page">
      <div className="navigation-container">
        <NavBar />
        <SubNavBar />
      </div>
      <SectionContainer>
        <SearchBar
          placeholder="Search by name or job title..."
          onSearch={handleSearch}
        />
      </SectionContainer>

      <div className="section-divider"></div>

      <FreelancerDiscovery searchQuery={searchQuery} catergory={catergory} />
    </div>
  );
};

export default DiscoveryPage;
