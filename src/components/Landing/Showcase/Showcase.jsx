import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Showcase.css";
import freelancerImg1 from "/src/assets/Card1.png";
import freelancerImg2 from "/src/assets/Card2.png";
import freelancerImg3 from "/src/assets/Card3.png";
import SectionContainer from "../../SectionContainer";
import BACKEND_URL from "../../../config/backend-config";

const Showcase = () => {
  const [selected, setSelected] = useState("Freelancer");
  const navigation = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);
  const handleAdminChat = async () => {
    try {
      if (loading) {
        return;
      }
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      // Fetch admin profile first
      const adminId = adminUsers[0].id;
      const adminProfile = adminUsers[0];
      if (!adminProfile) {
        console.error("Failed to fetch admin profile");
        return;
      }

      console.log("Admin profile data:", adminProfile); // Debug log

      const response = await fetch(`${BACKEND_URL}/api/admin-chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          targetId: adminId,
          chatType: "client-admin",
          initialMessage: "Hello",
          tags: ["admin"],
        }),
      });
      const data = await response.json();
      console.log({ data });
      if (!response.ok) {
        if (response.status === 401) {
          console.error("Authentication failed");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (role == "freelancer") {
        navigation("/messaging-freelancer");
      } else {
        navigation("/messaging-client");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const currentUserId = localStorage.getItem("uid");

      setLoading(true);

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const cleanToken = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;

      const response = await fetch(`${BACKEND_URL}/api/auth/admin/all/public`, {
        headers: {
          Authorization: cleanToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Authentication failed");
          return;
        }
        if (response.status === 404) {
          console.error("Admin endpoint not found. Please check the API URL.");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Filter out the current user from the admin list
      const filteredAdmins = data.admins.filter(
        (admin) => admin.id !== currentUserId
      );
      console.log({ filteredAdmins });
      setAdminUsers(filteredAdmins);
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionContainer padding={60}>
      <section id="landing" className="showcase-section">
        <div className="showcase-content">
          {/* Left Side - Text */}
          <div className="showcase-text">
            <h2>
              Building <br /> A Global Network Of Freelancers
            </h2>
            <p>
              We connect talented individuals with limitless opportunities,
              unlocking a world where freelancers thrive, collaborate, and grow
              together.
            </p>

            {/* Toggle Buttons */}
            <div className="toggle-buttons">
              <button
                className={`btn ${
                  selected === "Freelancer" ? "btn-dark" : "btn-light"
                }`}
                onClick={() => {
                  setSelected("Freelancer");
                  navigation("/freelancer-register");
                }}
              >
                Freelancer
              </button>
              <button
                className={`btn ${
                  selected === "Recruiter" ? "btn-dark" : "btn-light"
                }`}
                onClick={() => {
                  setSelected("Recruiter");
                  navigation("/client-register");
                }}
              >
                Recruiter
              </button>
            </div>
          </div>

          {/* Right Side - Image Cards */}
          <div className="showcase-images">
            <img
              src={freelancerImg1}
              alt="Freelancer 1"
              className="img-card img-card-1"
            />
            <img
              src={freelancerImg2}
              alt="Freelancer 2"
              className="img-card img-card-2"
            />
            <img
              src={freelancerImg3}
              alt="Freelancer 3"
              className="img-card img-card-3"
            />
          </div>
        </div>
      </section>
      <section className="sc-contact">
        {token !== "" && token !== null && (
          <button className="sc-contact-btn" onClick={() => handleAdminChat()}>
            <img src="../../../public/images/contact-us.svg" />
          </button>
        )}
      </section>
    </SectionContainer>
  );
};

export default Showcase;
