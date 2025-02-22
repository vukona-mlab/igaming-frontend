import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "../../../components/Profile/portfolioCard/portfolioCard"; // Import ProfileCard component
import ProfileForm from "../../../components/Profile/profileForm/profileForm"; // Import ProfileForm component
import CategoryPreferences from "../../../components/Profile/categoryPreferance/categoryPrefarencesClient"; // Import CategoryPreferences component
//import './freelancerProfile.css';
//import Navbar from '../../../components/Navbar/navbar'
import { Form, Button } from "react-bootstrap";

const ProfilePage = ({}) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    displayName: "",
    phone: "",
    dateOfBirth: "",
    speciality: "",
  });
  const [image, setImage] = useState();
  const [currImage, setCurrImage] = useState();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  useEffect(() => {
    getProfile();
  }, []);
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCurrImage(e.target.result);
      reader.readAsDataURL(file);
    }
    setImage(file);
  };

  const handleCategoriesSubmit = (data) => {
    let arr = Object.keys(data.categories).filter((key) => {
      if (data.categories[key] === true) {
        return key;
      }
    });
    setFormData((prev) => ({ ...prev, categories: arr }));
  };

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/auth/users/${uid}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log({ d: data });
        setFormData((prev) => ({ ...prev, name: data.user.name }));
        setFormData((prev) => ({ ...prev, surname: data.user.surname }));
        setFormData((prev) => ({
          ...prev,
          displayName: data.user.displayName,
        }));
        setFormData((prev) => ({ ...prev, phone: data.user.phone }));
        setFormData((prev) => ({
          ...prev,
          dateOfBirth: data.user.dateOfBirth,
        }));
        setFormData((prev) => ({ ...prev, speciality: data.user.speciality }));
        setCurrImage(data.user.profilePicture);
        //setData(data);
        // alert(data.message);
      } else {
        // Handle error
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const updateUserProfile = async (data) => {
    try {
      if (JSON.stringify(data) === "{}") {
        return;
      }
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("surname", data.surname);
      formData.append("displayName", data.displayName);
      formData.append("phoneNumber", data.phone);
      formData.append("email", data.email);
      formData.append("dateOfBirth", data.dateOfBirth);
      // formData.append("bio", formData.bio);
      formData.append("speciality", data.speciality);
      formData.append("category", data.category);
      //formData.append("extraAmount", formData.extraAmount);
      // formData.append("jobTitle", formData.jobTitle);
      formData.append("profilePicture", image);
      const response = await fetch(
        `http://localhost:8000/api/auth/users/${uid}/update`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        //setData(data);
        alert(data.message);
      } else {
        // Handle error
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return;
  return (
    <>
      <Container style={{ minHeight: "100vh", paddingBottom: "60px" }}>
        {/* First Row with ProfileCard and ProfileForm */}
        {/*<Navbar/>*/}
        <Row className="my-4">
          <Col md={3}>
            {/* Left Column - ProfileCard Component */}
            <ProfileCard
              speciality={formData.speciality}
              image={currImage}
              handleImageChange={handleImageChange}
            />
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
            />
            <Row>
              <Col>
                {/* Below the profile card and form - CategoryPreferences Component */}
                <CategoryPreferences onSubmit={handleCategoriesSubmit} />
              </Col>
            </Row>
            <Row className="justify-content-end mt-4">
              <Col xs={12} className="text-right">
                <Button className="cancel-button me-4">Cancel</Button>
                <Button
                  variant="dark"
                  className="update-button"
                  type="submit"
                  onClick={() => updateUserProfile(formData)}
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Second Row with CategoryPreferences */}
        <Row>
          <Col>
            {/* Below the profile card and form - CategoryPreferences Component */}
            {/* <CategoryPreferences />*/}
          </Col>
        </Row>
      </Container>

      {/* Place buttons outside of the container for better positioning 
      <div className="button-container">
        <button className="cancel-button">Cancel</button>
        <button className="update-button">Update</button>
      </div>*/}
    </>
  );
};

export default ProfilePage;
