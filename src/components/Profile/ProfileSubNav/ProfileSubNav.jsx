import React from "react";
import "./ProfileSubNav.css";
import Dashboard from "../../../../public/images/dashboard.svg";
import Message from "../../../../public/images/message.svg";

import Money from "../../../../public/images/money.svg";

import Order from "../../../../public/images/order.svg";

import { useNavigate } from "react-router";

export default function ProfileSubNav() {
  const navigation = useNavigate();
  console.log(
    localStorage.getItem("role") === "freelancer"
      ? "/messaging-freelancer"
      : "/messaging-client"
  );
  return (
    <>
      <div className="ProfileSubNav">
        <div class="p-subnav-content">
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
          <div className="p-subnav-link">
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
    </>
  );
}
