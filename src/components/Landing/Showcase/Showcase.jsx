import { useState } from "react";
import "./Showcase.css";
import freelancerImg1 from "/src/assets/Card1.png";
import freelancerImg2 from "/src/assets/Card2.png";
import freelancerImg3 from "/src/assets/Card3.png";

// import chatIcon from "/src/assets/chatty.png"; // Import the chat icon

const Showcase = () => {
  const [selected, setSelected] = useState("Freelancer");

  const handleChatClick = () => {
    // Add your click handler logic here
    console.log("Chat icon clicked!");
    // You can redirect to a chat page or open a chat modal, etc.
  };

  return (
    <section className="container showcase-section">
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
              className={`btn ${selected === "Freelancer" ? "btn-dark" : "btn-light"}`}
              onClick={() => setSelected("Freelancer")}
            >
              Freelancer
            </button>
            <button
              className={`btn ${selected === "Recruiter" ? "btn-dark" : "btn-light"}`}
              onClick={() => setSelected("Recruiter")}
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
  );
};

export default Showcase;