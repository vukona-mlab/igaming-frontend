import { useState } from "react";
import { useNavigate } from "react-router";
import "./Showcase.css";
import freelancerImg1 from "/src/assets/Card1.png";
import freelancerImg2 from "/src/assets/Card2.png";
import freelancerImg3 from "/src/assets/Card3.png";
import SectionContainer from "../../SectionContainer";

const Showcase = () => {
  const [selected, setSelected] = useState("Freelancer");
  const navigation = useNavigate();

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
                className={`btn ${selected === "Freelancer" ? "btn-dark" : "btn-light"
                  }`}
                onClick={() => {
                  setSelected("Freelancer");
                  navigation("/freelancer-register");
                }}
              >
                Freelancer
              </button>
              <button
                className={`btn ${selected === "Recruiter" ? "btn-dark" : "btn-light"
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
    </SectionContainer>

  );
};

export default Showcase;
