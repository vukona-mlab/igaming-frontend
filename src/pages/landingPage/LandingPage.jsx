import React from "react";
import CustomNavBar from "./CustomNavBar";
import "./LandingPage.css";
import SubNavBar from "../../components/Common/SubNavBar/SubNavBar";
import About from "../../components/Landing/about/About";
import Footer from "../footer/Footer";

function LandingPage() {
  return (
    <>
      <CustomNavBar />
      <SubNavBar />
      <About />
      <Footer />
    </>
  );
}

export default LandingPage;
