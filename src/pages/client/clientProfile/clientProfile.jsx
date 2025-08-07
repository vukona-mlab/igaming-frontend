import React, { useEffect, useState } from "react";
import withProfileCheck from "../../../components/Common/withProfileCheck";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProfileCard from "../../../components/Profile/portfolioCard/portfolioCard"; // Import ProfileCard component
import ProfileForm from "../../../components/Profile/profileForm/profileFormClient"; // Import ProfileForm component
import CategoryPreferences from "../../../components/Profile/categoryPreferance/categoryPrefarencesClient"; // Import CategoryPreferences component
import Navbar from "../../../components/Common/Navbar/navbar";
import "./clientProfile.css";
import Swal from "sweetalert2";
import SwitchRoleButton from "../../../components/Common/SwitchRoleButton/SwitchRoleButton";
import ProfileSubNav from "../../../components/Profile/ProfileSubNav/ProfileSubNav";
import SectionContainer from "../../../components/SectionContainer";
import BACKEND_URL from "../../../config/backend-config";
import { useNavigate } from "react-router-dom";
const ProfilePage = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    bio: "",
    email: "",
    displayName: "",
    phone: "",
    dateOfBirth: "",
    categories: [],
  });
  const [image, setImage] = useState();
  const [currImage, setCurrImage] = useState();
  const [loading, setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [currentRole, setCurrentRole] = useState("client");
  const navigate = useNavigate();
  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      categories: arr || [],
    });

    setFormData((prev) => ({ ...prev, categories: arr }));
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
      const response = await fetch(`${BACKEND_URL}/api/auth/users/${uid}`, {
        method: "GET",
        headers: { Authorization: token },
      });
      if (response.ok) {
        const data = await response.json();

        setFormData({
          name: data.user.name,
          surname: data.user.surname,
          bio: data.user.bio || "",
          email: data.user.email,
          displayName: data.user.displayName,
          phone: data.user.phoneNumber,
          dateOfBirth: data.user.dateOfBirth,
          categories: data.user.categories || [],
        });
        setCurrImage(data.user.profilePicture);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProfile = async (data) => {
    try {
      if (!Object.keys(data).length) return;

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("surname", data.surname);
      formData.append("bio", data.bio || "");
      formData.append("displayName", data.displayName);
      formData.append("phoneNumber", data.phone);
      formData.append("email", data.email);
      formData.append("dateOfBirth", data.dateOfBirth);
      formData.append("categories", JSON.stringify(data.categories));
      formData.append("profilePicture", image || "");

      const response = await fetch(
        `${BACKEND_URL}/api/auth/users/${uid}/update`,
        {
          method: "PUT",
          headers: { Authorization: token },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Show SweetAlert after successful update
        showAlert();
      }
      setIsUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRoleSwitch = async () => {
    try {
      const newRole = currentRole === "client" ? "freelancer" : "client";

      // Add confirmation dialog
      const result = await Swal.fire({
        title: "Switch Role?",
        text: `Are you sure you want to switch to ${newRole} mode?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, switch role",
        cancelButtonText: "Cancel",
      });

      // If user confirms
      if (result.isConfirmed) {
        const response = await fetch(
          `${BACKEND_URL}/api/auth/users/${uid}/roles`,
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
          localStorage.setItem("role", newRole);
          Swal.fire({
            title: "Role Updated!",
            text: `You are now a ${newRole}`,
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate(
              `/${newRole === "client" ? "client" : "freelancer"}-profile`
            );
          });
        } else {
          throw new Error("Failed to update role");
        }
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
  if (loading) return <div></div>;
  return (
    <>
      <Navbar />
      <ProfileSubNav showTransactions={true} />
      <SectionContainer>
        <Container fluid style={{}}>
          <div className="profile-edit d-flex justify-content-between align-items-center ps-0">
            <div className="welcome-message">
              {formData.displayName !== "" ? (
                <h4 className="welcome-name">
                  Welcome, {formData.displayName}
                </h4>
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
          <Row className="my-4">
            <Col md={3}>
              <ProfileCard
                jobTitle={"Recruiter"}
                image={currImage}
                handleImageChange={handleImageChange}
              />
            </Col>
            <Col md={9}>
              <ProfileForm
                formData={{
                  name: formData.name,
                  surname: formData.surname,
                  bio: formData.bio,
                  displayName: formData.displayName,
                  phone: formData.phone || "",
                  email: formData.email || "",
                  dateOfBirth: formData.dateOfBirth,
                }}
                handleChange={handleChange}
                isUpdate={isUpdate} // Pass isUpdate as a prop
              />
              <Row>
                <Col md={12} className="px-5 py-1">
                  <CategoryPreferences
                    onSubmit={handleCategoriesSubmit}
                    isUpdate={isUpdate}
                    cancel={() => setIsUpdate(false)}
                    categoriesArr={formData.categories}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Update and Cancel buttons at the bottom right */}
          {/* {isUpdate && (
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
              onClick={() => updateUserProfile(formData)}
              className="update-button"
            >
              Update
            </Button>
          </div>
        )} */}
        </Container>
      </SectionContainer>
    </>
  );
};

export default withProfileCheck(ProfilePage);
