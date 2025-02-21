import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "../../../components/portfolioCard/portfolioCard"; // Import ProfileCard component
import ProfileForm from "../../../components/profileForm/profileForm"; // Import ProfileForm component
import CategoryPreferences from "../../../components/categoryPreferance/categoryPrefarances"; // Import CategoryPreferences component
import './freelancerProfile.css';
import Navbar from '../../../components/Navbar/navbar'
const ProfilePage = ({ formData = {}, handleChange, handleSubmit }) => {
  return (
    <>
      <Container style={{ minHeight: "100vh", paddingBottom: "60px" }}>
        {/* First Row with ProfileCard and ProfileForm */}
        <Navbar/>
        <Row className="my-4">
          <Col md={3}>
            {/* Left Column - ProfileCard Component */}
            <ProfileCard speciality="" image="" />
          </Col>
          <Col md={9}>
            {/* Right Column - ProfileForm Component with props from components */}
            <ProfileForm 
              formData={{
                name: formData.name,
                surname: formData.surname,
                displayName: formData.displayName,
                phone: formData.phone || "",
                email: formData.email || "",
                dateOfBirth: formData.dateOfBirth,
                speciality: formData.speciality,
              }} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit} 
            />
          </Col>
        </Row>

        {/* Second Row with CategoryPreferences */}
        <Row>
          <Col>
            {/* Below the profile card and form - CategoryPreferences Component */}
            <CategoryPreferences />
          </Col>
        </Row>
      </Container>

      {/* Place buttons outside of the container for better positioning */}
      <div className="button-container">
        <button className="cancel-button">Cancel</button>
        <button className="update-button">Update</button>
      </div>
    </>
  );
};

export default ProfilePage;
