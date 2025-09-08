import React, { useEffect } from "react";
import "./SubNavBar.css";
import SectionContainer from "../../SectionContainer";
import { Link, useNavigate } from "react-router";

export default function SubNavBar() {
  // const navigation = useNavigate();
  // const paths = [
  //   "#Game-Development",
  //   "#Creative-And-Design",
  //   "#Audio-And-Music",
  //   "#Quality-Assurance",
  //   "#Compliance-And-Legal",
  //   "#Content-And-Marketing",
  // ];
  // const pathname = window.location.pathname;
  // const hash = window.location.hash;
  // useEffect(() => {
  //   if (pathname == "/" && paths.includes(hash)) {
  //     navigation("/discovery" + hash);
  //   }
  // }, [pathname, hash]);

  return (
    <SectionContainer containerColor={"black"}>
      <div className="subnav">
        <div className="subnav-content">
          <Link to={'/discovery?category=game development'}>Game Development</Link>
          <Link to={'/discovery?category=creative and design'}>Creative and Design</Link>
          <Link to={'/discovery?category=audio and music'}>Audio and Music</Link>
          <Link to={'/discovery?category=quality assurance'}>Quality Assurance</Link>
          <Link to={'/discovery?category=compliance and legal'}>Compliance and Legal</Link>
          <Link to={'/discovery?category=content and marketing'}>Content and Marketing</Link>
        </div>
      </div>
    </SectionContainer>
  );
}
