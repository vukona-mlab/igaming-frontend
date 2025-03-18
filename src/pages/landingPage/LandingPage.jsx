import React from "react";
import NavBar from "../../components/Common/Navbar/navbar";
import "./LandingPage.css";
import SubNavBar from "../../components/Common/SubNavBar/SubNavBar";
import About from "../../components/about/About";
import PopularServices from "../../components/Landing/PopularServices/PopularServices";
import Footer from "../footer/Footer";
import Showcase from "../../components/Landing/Showcase/Showcase";
import TopFreelancers from "../../components/Landing/TopFreelancers/TopFreelancers";
import MadeOnRI from "../../components/Landing/MadeOnRI/MadeOnRI";
import FAQSection from "../../components/Landing/FAQSection/FAQSection";
import SpeechBubble from "../../components/Landing/TestimonialsSection/SpeechBubble";
import TestimonialsSection from "../../components/Landing/TestimonialsSection/TestimonialsSection";
import GetStarted from "../../components/Landing/GetStartedSection/GetStarted";
function LandingPage() {
  return (
    <>
      <NavBar />
      <SubNavBar />
      <Showcase />
      <About />
      <GetStarted />
      <PopularServices />
      <MadeOnRI />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </>
  );
}

export default LandingPage;
