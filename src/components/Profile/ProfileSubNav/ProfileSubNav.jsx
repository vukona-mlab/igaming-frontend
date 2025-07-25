import React from "react";
import "./ProfileSubNav.css";
import Dashboard from "/images/dashboard.svg";
import Message from "/images/message.svg";

import Money from "/images/money.svg";

import Order from "/images/order.svg";

import { useNavigate } from "react-router";
import SectionContainer from "../../SectionContainer";

export default function ProfileSubNav() {
  const navigation = useNavigate();
  return (
    <SectionContainer containerColor="black">
      <div className="ProfileSubNav">
        <div className="p-subnav-content">
          <div className="p-subnav-link">
            <img src={Dashboard} className="dashboard-icon" />
            <div>Dashboard</div>
          </div>
          <div
            className="p-subnav-link"
            onClick={() => {
              console.log("testt");
              navigation(
                localStorage.getItem("role") === "freelancer"
                  ? "/messaging-freelancer"
                  : "/messaging-client"
              );
            }}
          >
            <img src={Message} className="message-icon" />

            <div>Messages</div>
          </div>
          <div
            className="p-subnav-link"
            onClick={() => {
              navigation("/projects");
            }}
          >
            <img src={Order} className="order-icon" />

            <div>Projects</div>
          </div>
          <div
            className="p-subnav-link"
            onClick={() => {
              navigation("/transactions");
            }}
          >
            <img src={Money} className="money-icon" />

            <div>Transactions</div>
          </div>
        </div>
      </div>
    </SectionContainer>


  );
}
