import React, { useEffect, useState } from "react";
import withProfileCheck from "../../../components/Common/withProfileCheck";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "../../../components/Profile/portfolioCard/portfolioCard"; // Import ProfileCard component
import ProfileForm from "../../../components/Profile/profileForm/profileForm"; // Import ProfileForm component
import CategoryPreferences from "../../../components/Profile/categoryPreferance/categoryPrefarances"; // Import CategoryPreferences component
import "./freelancerProfile.css";
import Navbar from "../../../components/Common/Navbar/navbar";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import SwitchRoleButton from "../../../components/Common/SwitchRoleButton/SwitchRoleButton";
import ProfileSubNav from "../../../components/Profile/ProfileSubNav/ProfileSubNav";
import { useNavigate } from "react-router-dom";
import SectionContainer from "../../../components/SectionContainer";
import NewPriceCard from "../../../components/PriceCard/NewPriceCard/NewPriceCard";
import ProjectUpload from "../../../components/Projects/ProjectUpload/ProjectUpload";
import BACKEND_URL from "../../../config/backend-config";

const PROFILE_REQUIREMENTS = ["name", "email", "profilePicture"];
const ProfilePage = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    displayName: "",
    phone: "",
    dateOfBirth: "",
    speciality: "",
    categories: [],
    packages: {},
  });
  const [image, setImage] = useState();
  const [currImage, setCurrImage] = useState();
  const [loading, setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentBenefits, setCurrentBenefits] = useState([]);
  const [currentType, setCurrentType] = useState("Basic");
  const url = BACKEND_URL;
  const role = localStorage.getItem("role");
  const [currentRole, setCurrentRole] = useState("freelancer");
  const [pricePackages, setPricePackages] = useState([
    { name: "Basic", price: 0, benefits: [] },
    { name: "Standard", price: 0, benefits: [] },
    { name: "Premium", price: 0, benefits: [] },
    { name: "Ultimate", price: 0, benefits: [] },
  ]);
  const [projectData, setProjectData] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const navigate = useNavigate();

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
    // let packages = [];

    // for (const [key, value] of Object.entries(data.prices)) {
    //   packages.push({ type: key, price: value, benefits: [] });
    // }

    // if (benefits && benefits.length > 0) {
    //   const updatedArr = packages.map((obj) => {
    //     const found = benefits.find((benefit) => benefit.type === obj.type);
    //     return { ...obj, benefits: found.benefits };
    //   });
    //   packages = updatedArr;
    // }
    updateUserProfile({
      ...formData,
      categories: arr || [],
      packages: pricePackages || [],
    });
    setFormData((prev) => ({ ...prev, categories: arr }));
    setFormData((prev) => ({ ...prev, packages: pricePackages }));
  };
  const showAlert = () => {
    Swal.fire({
      title: "Well done!",
      text: "Your profile has been updated.",
      icon: "success",
      confirmButtonText: "Cool",
    });
  };
  const showProjectUploadAlert = () => {
    Swal.fire({
      title: "Well done!",
      text: "Your project has been uploaded.",
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
        // console.log(data);
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
        if (data.user.packages && data.user.packages.length > 0) {
          setPricePackages(data.user.packages);
        }

        let obj = {};
        if (data.user && data.user.packages && data.user.packages.length > 0) {
          obj = data.user.packages.reduce(
            (obj, item) =>
              Object.assign(obj, { [item.name.toLowerCase()]: item.price }),
            {}
          );
          // console.log({ obj });
        }

        setFormData((prev) => ({
          ...prev,
          packages: obj || {},
        }));
        setFormData((prev) => ({
          ...prev,
          categories: data.user.categories || [],
        }));
        setCurrImage(data.user.profilePicture);
        setProjectData({ ...projectData, freelancerId: data.user.uid });
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
      // console.log("DATA ", data);

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
      //formData.append("packages", JSON.stringify(data.packages || []));
      // formData.append("jobTitle", formData.jobTitle);
      formData.append("profilePicture", image || "");
      const response = await fetch(`${url}/api/auth/users/${uid}/update`, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data);

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
  const handleDocument = () => {
    navigate("/view-document");
  };
  const handleRoleSwitch = async (newRole) => {
    try {
      const response = await fetch(`${url}/api/auth/users/${uid}/roles`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          roles: [newRole],
        }),
      });

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
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to switch roles. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleTabChange = (newTab) => {
    setSearchTerm(newTab);
  };
  const handleAddFeature = (feature) => {
    let arr = [...benefits];
    if (arr.length > 0) {
      arr = arr.map((obj) => {
        if (obj.type && obj.type === feature.type) {
          return { ...obj, benefits: [...obj.benefits, feature.feature] };
        }
        return obj;
      });
    } else {
      arr = [...arr, { type: feature.type, benefits: [feature.feature] }];
    }
    setBenefits(arr);
  };
  const handleUpdateFeature = (feature) => {
    let arr = [...benefits];
    if (arr.length > 0) {
      arr = arr.map((obj) => {
        if (obj.type && obj.type === feature.type) {
          let updatedArr = [...obj.benefits];
          updatedArr[feature.index] = feature.feature;
          return { ...obj, benefits: updatedArr };
        }
        return obj;
      });
    }
    setBenefits(arr);
  };

  const handleShowPriceModal = (name, price, benefits) => {
    console.log("running...", price);

    setCurrentPrice(price);
    setCurrentBenefits(benefits);
    setCurrentType(name);
    setShowPriceModal(true);
  };
  useEffect(() => {
    // console.log({ currentPrice, currentType, currentBenefits, showPriceModal });
  }, [showPriceModal]);
  const handlePriceFormSubmit = (benefits, price, type) => {
    setPricePackages((packages) => {
      return packages.map((pkg) => {
        if (type !== pkg.name) {
          return pkg;
        } else {
          return { name: type, price: price, benefits: benefits };
        }
      });
    });
  };
  useEffect(() => {
    // console.log({ pricePackages });
  }, [pricePackages]);
  if (loading) return <div></div>;
  return (
    <>
      <Navbar />
      <ProfileSubNav showTransactions={false} />
      <SectionContainer>
        {showProjectModal && projectData && (
          <ProjectUpload
            onClose={() => {
              setShowProjectModal(false);
            }}
            projectData={projectData}
            showProjectUploadAlert={showProjectUploadAlert}
          />
        )}
        <Container fluid style={{}} className="p-0 m-0">
          <NewPriceCard
            showModal={showPriceModal}
            setNewBenefitList={setCurrentBenefits}
            price={currentPrice}
            benefits={currentBenefits}
            type={currentType}
            handleFormSubmit={handlePriceFormSubmit}
            setShowModal={(name, price, benefits) =>
              setShowPriceModal(name, price, benefits)
            }
          />
          <div className="div-btn-top p-2 pr-upload-btns">
            <Button
              variant="dark"
              className="add-my-documents"
              onClick={() => setShowProjectModal(true)}
              type="submit"
            >
              Upload Project
            </Button>
            <Button
              variant="dark"
              className="add-my-documents"
              onClick={handleDocument}
              type="submit"
            >
              Add Document
            </Button>
          </div>
          <div className="profile-edit d-flex justify-content-between align-items-center">
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

          {/* First Row with ProfileCard and ProfileForm */}
          <Row className="my-4">
            <Col md={3}>
              {/* Left Column - ProfileCard Component */}
              <ProfileCard
                jobTitle={jobTitle || formData.speciality}
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
                    packagesObj={formData.packages}
                    pricePackages={pricePackages}
                    handleAddFeature={handleAddFeature}
                    benefits={benefits}
                    showPriceModal={handleShowPriceModal}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </SectionContainer>
    </>
  );
};

const WrappedProfilePage = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    displayName: "",
    phone: "",
    dateOfBirth: "",
    speciality: "",
    categories: [],
    packages: {},
  });
  // ...existing code...
  // move all state and logic from ProfilePage here
  return <ProfilePage {...props} formData={formData} setFormData={setFormData} />;
};
export default (props) => {
  const [formData, setFormData] = React.useState({
    name: "",
    surname: "",
    email: "",
    displayName: "",
    phone: "",
    dateOfBirth: "",
    speciality: "",
    categories: [],
    packages: {},
  });
  return withProfileCheck(
    () => <WrappedProfilePage {...props} formData={formData} setFormData={setFormData} />, 
    PROFILE_REQUIREMENTS
  )({ ...props, userProfile: formData });
};
