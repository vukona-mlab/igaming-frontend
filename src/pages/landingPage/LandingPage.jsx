import React from "react";
import CustomNavBar from "./CustomNavBar";
import "./LandingPage.css";
import SubNavBar from "../../components/Common/SubNavBar/SubNavBar";
import About from "../../components/Landing/about/About";
import Footer from "../footer/Footer";
import Showcase from "../../components/Landing/Showcase/Showcase";

function LandingPage() {
  return (
    <>
      <CustomNavBar />
      <SubNavBar />
      <Showcase />
      <About />
      <Footer />
    </>
  );
}

export default LandingPage;
