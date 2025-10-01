import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate, Outlet } from "react-router-dom";
import NavBar from "../../components/Common/Navbar/navbar";
import SubNavBar from "../../components/Common/SubNavBar/SubNavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import FreelancerDiscovery from "../../components/FreelancerDiscovery/FreelancerDiscovery";
import SectionContainer from "../../components/SectionContainer";
import { useProfileCompletionContext } from "../../components/Common/ProfileCompletionContext";
import { Spinner } from "react-bootstrap";
import "./DiscoveryPage.css";

const DiscoveryPage = () => {
  const { freelancer_id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isProfileComplete, blocked } = useProfileCompletionContext();

  const query = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const [loading, setLoading] = useState(true);

  const handleSearch = (searchTerm) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (searchTerm.trim()) params.set("search", searchTerm);
    navigate(`/discovery?${params.toString()}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (freelancer_id) return <Outlet />;

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
          Your account is blocked. Many features are disabled. Please contact admin.
        </div>
      )}

      <div className="navigation-container">
        <NavBar />
        <SubNavBar />
      </div>

      <SectionContainer>
        <SearchBar placeholder="Search by name or job title..." onSearch={handleSearch} />
      </SectionContainer>

      <div className="section-divider"></div>

      <FreelancerDiscovery searchQuery={query} category={category} disabled={blocked} />
    </div>
  );
};

export default DiscoveryPage;
