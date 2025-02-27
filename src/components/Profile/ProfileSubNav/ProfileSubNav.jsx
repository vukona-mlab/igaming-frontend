import React from "react";
import "./ProfileSubNav.css";
import { useNavigate } from "react-router";

export default function ProfileSubNav() {
  const navigation = useNavigate();
  return (
    <>
      <div className="ProfileSubNav">
        <div class="p-subnav-content">
          <a href="#dashboard">Dashboard</a>
          <a href="">Messages</a>
          <a href="#projects">Projects</a>
          <a href="#transactions">Transactions</a>
        </div>
      </div>
    </>
  );
}
