import React from "react";
import CustomNavBar from "./CustomNavBar";
import "./LandingPage.css";
import SubNavBar from "../../components/Common/SubNavBar/SubNavBar";
import About from "../../components/about/About";
import PopularServices from "../../components/Landing/PopularServices/PopularServices";
import Footer from "../footer/Footer";
import Showcase from "../../components/Landing/Showcase/Showcase";
import TopFreelancers from "../../components/Landing/TopFreelancers/TopFreelancers";
import MadeOnRI from "../../components/Landing/MadeOnRI/MadeOnRI";
import FAQSection from "../../components/Landing/FAQSection/FAQSection";
function LandingPage() {
  return (
    <>
      <CustomNavBar />
      <SubNavBar />
      <Showcase />
      <TopFreelancers />
      <PopularServices/>
      <MadeOnRI />
      <FAQSection />
      <About />
      <Footer />
    </>
  );
}

export default LandingPage;
