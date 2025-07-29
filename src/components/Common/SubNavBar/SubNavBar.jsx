import React, { useEffect } from "react";
import "./SubNavBar.css";
import SectionContainer from "../../SectionContainer";
import { useNavigate } from "react-router";

export default function SubNavBar() {
  const navigation = useNavigate();
  const paths = [
    "#Game-Development",
    "#Creative-And-Design",
    "#Audio-And-Music",
    "#Quality-Assurance",
    "#Compliance-And-Legal",
    "#Content-And-Marketing",
  ];
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  useEffect(() => {
    if (pathname == "/" && paths.includes(hash)) {
      navigation("/discovery" + hash);
    }
  }, [pathname, hash]);

  return (
    <SectionContainer containerColor={"black"}>
      <div className="subnav">
        <div className="subnav-content">
          <a href="#Game-Development">Game Development</a>
          <a href="#Creative-And-Design">Creative and Design</a>
          <a href="#Audio-And-Music">Audio and Music</a>
          <a href="#Quality-Assurance">Quality Assurance</a>
          <a href="#Compliance-And-Legal">Compliance and Legal</a>
          <a href="#Content-And-Marketing">Content and Marketing</a>
        </div>
      </div>
    </SectionContainer>
  );
}
