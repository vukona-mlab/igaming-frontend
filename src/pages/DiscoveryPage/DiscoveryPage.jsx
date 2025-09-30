import React, { useState, useEffect } from "react";
import NavBar from "../../components/Common/Navbar/navbar";
import SubNavBar from "../../components/Common/SubNavBar/SubNavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import FreelancerDiscovery from "../../components/FreelancerDiscovery/FreelancerDiscovery";
import "./DiscoveryPage.css";
import { useParams, Outlet, useSearchParams, useNavigate } from "react-router-dom";
import SectionContainer from "../../components/SectionContainer";
import { useProfileCompletionContext } from "../../components/Common/ProfileCompletionContext";
import { Spinner } from "react-bootstrap";

const DiscoveryPage = () => {
  const { freelancer_id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { query, category } = Object.fromEntries(searchParams);
  const { isProfileComplete, isModalOpen, blocked } = useProfileCompletionContext();
  const [loading, setLoading] = useState(true);

  const handleSearch = (query) => {
    if (query.trim() !== "") {
      if (category) {
        navigate(`/discovery?category=${category}&search=${query}`);
      } else {
        navigate(`/discovery?search=${query}`);
      }
    } else {
      if (category) {
        navigate(`/discovery?category=${category}`);
      } else {
        navigate(`/discovery`);
      }
      
    }
  };

  useEffect(() => {
    // Simulate small delay for loader effect (or remove if not needed)
    const timer = setTimeout(() => setLoading(false), 300); 
    return () => clearTimeout(timer);
  }, []);

  if (freelancer_id !== "" && typeof freelancer_id !== "undefined") {
    return <Outlet />;
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="discovery-page">
      {isProfileComplete && blocked && (
        <div
          style={{
            background: "#f3f4f6",
            color: "#92400e",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Your account is blocked, please talk to admin to see how to unlock it. Many features will be disabled while your account is blocked.
        </div>
      )}
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

      <FreelancerDiscovery searchQuery={query} category={category} disabled={blocked} />
    </div>
  );
};

export default DiscoveryPage;
