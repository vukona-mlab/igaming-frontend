import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "../../../components/Profile/portfolioCard/portfolioCard"; // Import ProfileCard component
import ProfileForm from "../../../components/Profile/profileForm/profileForm"; // Import ProfileForm component
import CategoryPreferences from "../../../components/Profile/categoryPreferance/categoryPrefarances"; // Import CategoryPreferences component
//import './freelancerProfile.css';
import Navbar from "../../../components/Common/Navbar/navbar";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import SwitchRoleButton from "../../../components/Common/SwitchRoleButton/SwitchRoleButton";
import ProfileSubNav from "../../../components/Profile/ProfileSubNav/ProfileSubNav";
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
  const [jobTitle, setJobTitle] = useState("");

  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");

  const url = import.meta.env.VITE_API_URL;
  const role = localStorage.getItem("role");
  const [currentRole, setCurrentRole] = useState("freelancer");

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
    console.log({ e: data });
    let arr = Object.keys(data.categories).filter((key) => {
      if (data.categories[key] === true) {
        return key;
      }
    });
    updateUserProfile({
      ...formData,
      categories: arr || [],
      extraAmount: data.prices || {},
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
      const response = await fetch(`${url}/api/auth/users/${uid}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setJobTitle(data.user.jobTitle);
        setFormData((prev) => ({ ...prev, name: data.user.name }));
        setFormData((prev) => ({ ...prev, surname: data.user.surname }));
        setFormData((prev) => ({ ...prev, email: data.user.email }));

        setFormData((prev) => ({
          ...prev,
          displayName: data.user.displayName,
        }));
        setFormData((prev) => ({ ...prev, phone: data.user.phoneNumber }));
        setFormData((prev) => ({
          ...prev,
          dateOfBirth: data.user.dateOfBirth,
        }));
        setFormData((prev) => ({
          ...prev,
          speciality:
            (data.user.specialities && data.user.specialities[0]) || "",
        }));
        setFormData((prev) => ({
          ...prev,
          extraAmount: data.user.extraAmount || {},
        }));
        setFormData((prev) => ({
          ...prev,
          categories: data.user.categories || [],
        }));
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
    console.log({ forma: data });
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
      formData.append("speciality", JSON.stringify([data.speciality || ""]));
      formData.append("categories", JSON.stringify(data.categories));
      formData.append("extraAmount", JSON.stringify(data.extraAmount || {}));
      // formData.append("jobTitle", formData.jobTitle);
      formData.append("profilePicture", image || "");
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
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);

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

  const handleRoleSwitch = async (newRole) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/auth/users/${uid}/roles`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            roles: [newRole],
          }),
        }
      );

      if (response.ok) {
        setCurrentRole(newRole);
        Swal.fire({
          title: "Role Updated!",
          text: `You are now a ${newRole}`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = `/${
            newRole === "client" ? "client" : "freelancer"
          }-profile`;
        });
      } else {
        throw new Error("Failed to update role");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to switch roles. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <Navbar />
      <ProfileSubNav />
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
          <div>
            <SwitchRoleButton
              currentRole={currentRole}
              onRoleSwitch={handleRoleSwitch}
            />
            {!isUpdate && (
              <Button variant="dark" onClick={() => setIsUpdate(true)}>
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* First Row with ProfileCard and ProfileForm */}
        <Row className="my-4">
          <Col md={3}>
            {/* Left Column - ProfileCard Component */}
            <ProfileCard
              jobTitle={jobTitle}
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
                <CategoryPreferences
                  onSubmit={handleCategoriesSubmit}
                  isUpdate={isUpdate}
                  cancel={() => setIsUpdate(false)}
                  categoriesArr={formData.categories}
                  extraAmountObj={formData.extraAmount}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
