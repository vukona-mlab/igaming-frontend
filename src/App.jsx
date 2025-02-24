import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import FreelancerRegister from "./pages/freelancer/Register-page/Register";
import FreelancerSignIn from "./pages/freelancer/SigninForm/SignIn";
import FreelancerProfile from "./pages/freelancer/freelanceProfile/frelancerProfile";

import ClientProfile from "./pages/client/clientProfile/clientProfile";
import ClientRegister from "./pages/client/Register-page/ClientRegister";
import ClientSignIn from "./pages/client/SignInPage/SignIn";
import LandingPage from "./pages/landingPage/LandingPage";
import ProtectedRouteReg from "./components/Protected/ProtectedReg";
import ProtectedRoutes from "./components/Protected/ProtectedRoutes";
import ProtectRole from "./components/Protected/ProtectRole";
import FreelancerCard from "./components/Freelancer Card/FreelancerCard";
import profileImage from './assets/download.jpg';
import ProjectCard from './components/Project Card/ProjectCard';
import projectImage from './assets/project-image.jpg';


function App() {
  const userRole = localStorage.getItem("role");
  
  const handleMessage = (freelancerName) => {
    console.log(`Messaging ${freelancerName}`);
    // Add your message handling logic here
  };

  const handleDemo = (projectName) => {
    console.log(`Opening demo for ${projectName}`);
    // Add your demo link handling logic here
  };

  return (
    <div className="App">
      <div className="app-container">
        <div style={{ 
          maxWidth: "1200px", 
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px"
        }}>
          <FreelancerCard
            profilePicture={profileImage}
            name="John Doe"
            jobTitle="Full Stack Developer"
            projectsCompleted={25}
            rating={4.8}
            onMessageClick={() => handleMessage("John Doe")}
          />
          <FreelancerCard
            profilePicture={profileImage}
            name="Jane Smith"
            jobTitle="UI/UX Designer"
            projectsCompleted={32}
            rating={4}
            onMessageClick={() => handleMessage("Jane Smith")}
          />
          <ProjectCard
            projectPicture={projectImage}
            projectName="Amazing Project"
            likes={42}
            authorName="John Doe"
            onDemoClick={() => handleDemo("Amazing Project")}
          />
          <ProjectCard
            projectPicture={projectImage}
            projectName="Cool App"
            likes={1325258}
            authorName="Jane Smith"
            onDemoClick={() => handleDemo("Cool App")}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
