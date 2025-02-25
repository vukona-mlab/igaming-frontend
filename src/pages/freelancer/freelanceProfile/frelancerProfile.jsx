import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "../../../components/Profile/portfolioCard/portfolioCard"; // Import ProfileCard component
import ProfileForm from "../../../components/Profile/profileForm/profileForm"; // Import ProfileForm component
import CategoryPreferences from "../../../components/Profile/categoryPreferance/categoryPrefarances"; // Import CategoryPreferences component
//import './freelancerProfile.css';
import Navbar from "../../../components/Common/Navbar/navbar";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const ProfilePage = ({}) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    displayName: "",
    phone: "",
    dateOfBirth: "",
    speciality: "",
    categories: [],
    extraAmount: {},
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
    updateUserProfile({
      ...formData,
      categories: arr,
      extraAmount: data.prices,
    });

    setFormData((prev) => ({ ...prev, categories: arr }));
    setFormData((prev) => ({ ...prev, extraAmount: data.prices }));
  };
  const showAlert = () => {
    Swal.fire({
      title: "Well done!",
      text: "Your profile has been updated.",
      icon: "success",
      confirmButtonText: "Cool",
    });
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
        console.log({ data });
        setFormData((prev) => ({ ...prev, name: data.user.name }));
        setFormData((prev) => ({ ...prev, surname: data.user.surname }));
        setFormData((prev) => ({ ...prev, email: data.user.email }));

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
      formData.append("category", JSON.stringify(data.categories));
      formData.append("extraAmount", JSON.stringify(data.extraAmount));
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
        // Show SweetAlert after successful update
        showAlert();
      } else {
        // Handle error
      }
      setIsUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return;
  return (
    <>
      <Navbar />

      <Container style={{ minHeight: "100vh", paddingBottom: "60px" }}>
        <div className="profile-edit d-flex justify-content-between align-items-center">
          <div className="welcome-message">
            {formData.displayName !== "" ? (
              <h4 className="welcome-name">Welcome, {formData.displayName}</h4>
            ) : (
              <h4 className="welcome-name"></h4>
            )}
            {/* Placeholder for the user's name */}
          </div>
          {!isUpdate && (
            <Button variant="dark" onClick={() => setIsUpdate(true)}>
              Edit
            </Button>
          )}
        </div>

        {/* First Row with ProfileCard and ProfileForm */}
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
                name: formData.name || "",
                surname: formData.surname || "",
                displayName: formData.displayName || "",
                phone: formData.phone || "",
                email: formData.email || "",
                dateOfBirth: formData.dateOfBirth || "",
                speciality: formData.speciality || "",
              }}
              handleChange={handleChange}
              isUpdate={isUpdate}
            />
            <Row>
              <Col>
                {/* Below the profile card and form - CategoryPreferences Component */}
                <CategoryPreferences />
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Update and Cancel buttons at the bottom right */}
        {isUpdate && (
          <div className="profile-buttons-container">
            <Button
              variant="secondary"
              onClick={() => setIsUpdate(false)}
              className="cancel-button"
            >
              Cancel
            </Button>
            <Button
              variant="dark"
              onClick={() => handleCategoriesSubmit(formData)}
              className="update-button"
            >
              Update
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default ProfilePage;
