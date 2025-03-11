import React, { useState } from "react";
import "./TabsHeader.css";

const TabsHeader = ({ fieldOne, fieldTwo, handleTabChange }) => {
  const [currentTab, setCurrentTab] = useState(fieldOne);
  return (
    <div className="TabsHeader">
      <div
        className={currentTab === fieldOne ? "tbh-tab currentTab" : "tbh-tab"}
        onClick={() => {
          setCurrentTab(fieldOne);
          handleTabChange(fieldOne);
        }}
      >
        {fieldOne}
      </div>
      <div
        className={currentTab === fieldTwo ? "tbh-tab currentTab" : "tbh-tab"}
        onClick={() => {
          setCurrentTab(fieldTwo);
          handleTabChange(fieldTwo);
        }}
      >
        {fieldTwo}
      </div>
    </div>
  );
};

export default TabsHeader;
