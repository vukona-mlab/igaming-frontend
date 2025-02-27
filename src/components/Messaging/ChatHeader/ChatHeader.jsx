import React from "react";
import "./ChatHeader.css";

const ChatHeader = ({ person }) => {
  return (
    <div className="ChatHeader">
      <img src="" />
      <div className="chatHeaderInfo">
        <div className="ci-one">
          <div className="ci-person-name">{person && person.name}</div>
          <div className="ci-last-seen">{person && person.lastSeen}</div>
        </div>
        <div className="ci-two">
          <div className="ci-options"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
