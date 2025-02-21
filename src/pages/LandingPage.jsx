import React from "react";
import NavBar from "../components/Navbar/navbar";
import "./LandingPage.css";
import SubNavBar from "../components/SubNavBar/SubNavBar";
import About from "../components/about/About"; 
import Footer from "./footer/Footer";

function LandingPage() {
  return (
    <>
      <NavBar />
      <SubNavBar />
      <About/>
     <Footer/>
    </>
  );
}

export default LandingPage;
