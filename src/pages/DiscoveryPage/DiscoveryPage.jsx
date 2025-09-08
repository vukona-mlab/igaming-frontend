import React, { useState, useEffect } from "react";
import NavBar from "../../components/Common/Navbar/navbar";
import SubNavBar from "../../components/Common/SubNavBar/SubNavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import FreelancerDiscovery from "../../components/FreelancerDiscovery/FreelancerDiscovery";
import "./DiscoveryPage.css";
import { useParams, Outlet, useSearchParams, useNavigate } from "react-router-dom";
import SectionContainer from "../../components/SectionContainer";
import { useProfileCompletionContext } from "../../components/Common/ProfileCompletionContext";
const DiscoveryPage = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const { freelancer_id } = useParams();
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { query, category } = Object.fromEntries(searchParams)
  // console.log({ category, query });
  // const [catergory, setCatergory] = useState("");
  const { isProfileComplete, isModalOpen, blocked } = useProfileCompletionContext();

  // console.log({ isProfileComplete, blocked });
  // useEffect(() => {
  //   const { search, category } = Object.fromEntries(searchParams)
  //   console.log({ category, search });
  // }, [searchParams])
  const handleSearch = (query) => {
    if (query.trim() !== "") {
      if (category) {
        navigate(`/discovery?category=${category}&search=${query}`)
      } else {
        navigate(`/discovery?search=${query}`)
      }
    } else {
      if (category) {
        navigate(`/discovery?category=${category}`)
      } else {
        navigate(`/discovery`)
      }
    }


  };
  if (freelancer_id !== "" && typeof freelancer_id !== "undefined") {
    return <Outlet />;
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
