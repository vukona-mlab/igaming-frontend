import React from "react";
import CustomNavBar from "../pages/CustomNavBar";
import "./LandingPage.css";
import SubNavBar from "../components/SubNavBar/SubNavBar";
import About from "../components/about/About";
import Footer from "./footer/Footer";

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
