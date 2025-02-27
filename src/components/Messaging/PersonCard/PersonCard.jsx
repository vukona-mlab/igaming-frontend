import React from "react";
import "./PersonCard.css";

const PersonCard = ({ person }) => {
  return (
    <div className="PersonCard">
      <img src="" />
      <div className="personCardInfo">
        <div className="personCardInfo-one">
          <div className="person-name">{person && person.name}</div>
          <div className="pc-latest-message">
            {person && person.messages && person.messages[0]}
          </div>
        </div>
        <div className="personCardInfo-twi">
          <div className="pc-timestamp">{person && person.timestamp}</div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
